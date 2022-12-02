import React, { useEffect, useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../../hooks/useError";
import { PROGRESS_BAR_MS_PER_UPDATES } from "../../util/constants";
import { detectErrorType, ErrorTypes } from "../../util/errors";
import { wormhole } from "../../wormhole";

//#region state
type FileInfo = {
  name: string;
  size: number;
};

type State =
  | {
      status: "idle";
    }
  | {
      status: "sending";
      step: "inProgress" | "failed" | "succeeded";
      code: string;
      file: FileInfo;
      progress: number;
      // TODO: only exist on failed step
      error?: any;
      // TODO: make step before "inProgress"?
      startTime?: number;
    }
  | {
      status: "receiving";
      step: "confirming" | "inProgress" | "failed" | "succeeded";
      file: FileInfo;
      progress: number;
      // TODO: only exist on failed step
      error?: any;
      // TODO: make step before "inProgress"?
      startTime?: number;
    };

const initialState: State = {
  status: "idle",
};
//#endregion

//#region selectors
export function selectEta(state: State) {
  if (state.status !== "idle" && state.startTime) {
    const now = Date.now();
    const secSinceBegin = (now - state.startTime) / 1000;
    const bytesPerSecond = state.progress / secSinceBegin;
    const bytesRemaining = state.file.size - state.progress;
    return Math.ceil(bytesRemaining / bytesPerSecond);
  } else {
    return -1;
  }
}
//#endregion

//#region actions and reducer
type Action =
  | {
      type: "sendFile";
      code: string;
      file: FileInfo;
    }
  | { type: "sendFileSuccess" }
  | { type: "receiveFileRequest"; file: FileInfo }
  | { type: "receiveFileConfirm" }
  | { type: "receiveFileSuccess" }
  | {
      type: "updateProgress";
      progress: number;
    }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "sendFile": {
      if (state.status === "idle") {
        return {
          status: "sending",
          step: "inProgress",
          code: action.code,
          file: action.file,
          progress: 0,
        };
      } else {
        return state;
      }
    }
    case "sendFileSuccess": {
      if (state.status === "sending" && state.step === "inProgress") {
        return {
          ...state,
          step: "succeeded",
        };
      } else {
        return state;
      }
    }
    case "receiveFileRequest": {
      if (state.status === "idle") {
        return {
          status: "receiving",
          step: "confirming",
          file: action.file,
          progress: 0,
        };
      } else {
        return state;
      }
    }
    case "receiveFileConfirm": {
      if (state.status === "receiving" && state.step === "confirming") {
        return {
          ...state,
          step: "inProgress",
        };
      } else {
        return state;
      }
    }
    case "receiveFileSuccess": {
      if (state.status === "receiving" && state.step === "inProgress") {
        return {
          ...state,
          step: "succeeded",
        };
      } else {
        return state;
      }
    }
    case "updateProgress": {
      if (state.status !== "idle") {
        return {
          ...state,
          progress: action.progress,
          startTime: state.startTime || Date.now(),
        };
      } else {
        return state;
      }
    }
    case "reset": {
      return initialState;
    }
  }
}
//#endregion

//#region component
export const WormholeContext =
  React.createContext<{
    state: State;
    sendFile: (file: File) => Promise<void>;
    receiveFileRequest: (code: string) => Promise<() => Promise<void>>;
    reset: () => void;
  } | null>(null);

type Props = React.PropsWithChildren<{}>;

export default function WormholeProvider(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const client = useRef(-1);
  const lastProgressUpdate = useRef(Date.now());
  const navigate = useNavigate();
  const error = useError();

  const progressFunc = (sentBytes: number, totalBytes: number) => {
    const now = Date.now();
    if (now - lastProgressUpdate.current > PROGRESS_BAR_MS_PER_UPDATES) {
      dispatch({ type: "updateProgress", progress: sentBytes });
      lastProgressUpdate.current = now;
    }
  };

  useEffect(() => {
    (async () => {
      const go = new Go();
      go.exit = (code: number) => {
        console.warn(`Go exited with code ${code}`);
        error?.setError(ErrorTypes.WASM_EXITED);
      };
      let wasm: { instance: WebAssembly.Instance };
      const wasmPromise = fetch("/wormhole.wasm");
      if (typeof WebAssembly.instantiateStreaming === "undefined") {
        const wasmData = await (await wasmPromise).arrayBuffer();
        wasm = await WebAssembly.instantiate(wasmData, go.importObject);
      } else {
        wasm = await WebAssembly.instantiateStreaming(
          wasmPromise,
          go.importObject
        );
      }
      go.run(wasm.instance);

      client.current = wormhole.Client.newClient({
        rendezvousURL:
          process.env["MAILBOX_URL"] ||
          `ws://${window.location.hostname}:4000/v1`,
        transitRelayURL:
          process.env["RELAY_URL"] || `ws://${window.location.hostname}:4002`,
        passPhraseComponentLength: 2,
      });
    })();
  }, []);

  return (
    <WormholeContext.Provider
      value={{
        state,
        sendFile: async (file: File) => {
          const transfer = await wormhole.Client.sendFile(
            client.current,
            file.name,
            file,
            {
              progressFunc,
            }
          );
          dispatch({ type: "sendFile", code: transfer.code!, file });
          try {
            await transfer.done;
            dispatch({ type: "sendFileSuccess" });
          } catch (e: any) {
            if (e.includes("failed to write")) {
              window.history.pushState({}, "", "/s?cancel=");
              window.location.reload();
            } else {
              error?.setError(detectErrorType(`SendErr: ${error}`));
            }
          }
        },
        receiveFileRequest: async (code: string) => {
          const reader = await wormhole.Client.recvFile(client.current, code, {
            progressFunc,
          });
          dispatch({
            type: "receiveFileRequest",
            file: { name: reader.name, size: reader.size },
          });
          return async () => {
            try {
              dispatch({ type: "receiveFileConfirm" });
              while (true) {
                const buffer = new Uint8Array(reader.bufferSizeBytes);
                const [, done] = await reader.read(buffer);
                if (done) {
                  break;
                }
              }
              dispatch({
                type: "receiveFileSuccess",
              });
            } catch (e: any) {
              if (e.includes("unexpected EOF")) {
                navigate("/r?cancel=", { replace: true });
                window.location.reload();
              } else {
                error?.setError(detectErrorType(e));
              }
            }
          };
        },
        reset: () => {
          dispatch({ type: "reset" });
        },
      }}
    >
      {props.children}
    </WormholeContext.Provider>
  );
}
//#endregion
