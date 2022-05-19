import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { detectErrorType } from "./util/detectErrorType";
import { durationToClosesUnit } from "./util/durationToClosestUnit";
import ClientWorker from "./wormhole/client_worker";
import {
  ClientConfig,
  TransferOptions,
  TransferProgress,
} from "./wormhole/types";

const MAX_FILE_SIZE_MB = 200;
const MB = 1000 ** 2;
const MAX_FILE_SIZE_BYTES = MB * MAX_FILE_SIZE_MB;
const updateProgressETAFrequency = 10;

const enum SendFileError {
  CLIENT_NOT_INITIALIZED,
  FILE_TOO_LARGE,
}

const enum SaveFileError {
  CLIENT_NOT_INITIALIZED,
}

type Props = PropsWithChildren<{}>;

export const WormholeContext = React.createContext<{
  code: string;
  fileMeta: Record<string, any> | null;
  progressETA: string;
  saveFile: (code: string) => Promise<TransferProgress> | SaveFileError;
  sendFile: (
    file: File,
    opts?: TransferOptions
  ) => Promise<TransferProgress | SendFileError>;
} | null>(null);

export function WormholeProvider(props: Props) {
  const defaultConfig: ClientConfig = {
    rendezvousURL: "ws://localhost:4000/v1",
    // process.env["VUE_APP_STAGE_MAILBOX_URL"] || "ws://localhost:4000/v1",
    transitRelayURL: "ws://localhost:4002",
    // process.env["VUE_APP_STAGE_RELAY_URL"] || "ws://localhost:4002",
    passPhraseComponentLength: 2,
  };
  const client = useRef<ClientWorker | null>(null);

  // NOTE: this might just be hardcoded actually.
  // in the original code, newClient is called only once. also, in development environment there's seemingly dead code that dispatches setConfig.
  // so AFAIK this could be removed.
  const [config, setConfig] = useState(defaultConfig);
  const [progress, setProgress] = useState(-1);
  const [progressCounter, setProgressCounter] = useState(0);
  const [progressBegin, setProgressBegin] = useState(0);
  const [progressETASeconds, setProgressETASeconds] = useState(0);

  const progressETA =
    progress >= 1 ? "" : durationToClosesUnit(progressETASeconds);

  // NOTE: maybe code and filemeta can be combined values in a state machine.
  // seems like these values are only non null when a user uploaded a file for transfer.
  // but receiving also sets file meta, but it has a bit of extra details too.
  // maybe i could separate their types.
  const [code, setCode] = useState("");
  const [fileMeta, setFileMeta] = useState<Record<string, any> | null>(null);
  const [progressTimeoutCancel, setProgressTimeoutCancel] =
    useState<Function | null>(null);
  const [progressHung, setProgressHung] = useState(false);

  useEffect(() => {
    client.current = new ClientWorker(defaultConfig);
  }, [config]);

  function updateProgress(sentRatio: number): void {
    if (progressBegin === 0) {
      setProgressBegin(Date.now());
    }

    setProgress(sentRatio);
    setProgressCounter(progressCounter + 1);
  }

  async function sendFile(
    file: File,
    opts?: TransferOptions
  ): Promise<TransferProgress | SendFileError> {
    if (!client.current) {
      return SendFileError.CLIENT_NOT_INITIALIZED;
    }

    if (opts?.size && opts?.size > MAX_FILE_SIZE_BYTES) {
      return SendFileError.FILE_TOO_LARGE;
    }

    const progressFunc = (sentBytes: number, totalBytes: number) => {
      updateProgress(sentBytes / totalBytes);
      updateProgressETA(sentBytes, totalBytes);
    };

    if (typeof opts === "undefined") {
      opts = { progressFunc };
    } else if (typeof opts.progressFunc !== "function") {
      opts.progressFunc = progressFunc;
    } else {
      const _progressFunc = opts.progressFunc;
      opts.progressFunc = (sentBytes: number, totalBytes: number): void => {
        _progressFunc(sentBytes, totalBytes);
        progressFunc(sentBytes, totalBytes);
      };
    }

    const p = client.current.sendFile(file, opts);
    p.then(({ code, done }) => {
      const { name, size } = file;
      setCode(code || "");
      setFileMeta({ name, size });
      return done;
    })
      .then(() => {
        alert("done!");
        updateProgress(-1);
      })
      .catch((error: string) => Promise.reject(detectErrorType(error)));
    return p;
  }

  function saveFile(code: string): Promise<TransferProgress> | SaveFileError {
    if (!client.current) {
      return SaveFileError.CLIENT_NOT_INITIALIZED;
    }
    const opts = {
      progressFunc: (sentBytes: number, totalBytes: number) => {
        // TODO: refactor
        if (progressTimeoutCancel) {
          progressTimeoutCancel();
          setProgressHung(false);
        }

        updateProgress(sentBytes / totalBytes);
        updateProgressETA(sentBytes, totalBytes);

        // TODO: refactor
        const timeoutID = window.setTimeout(() => {
          setProgressHung(true);
        }, 500);
        const cancel = () => {
          window.clearTimeout(timeoutID);
        };
        setProgressTimeoutCancel(cancel);
      },
    };

    const p = client.current.saveFile(code.toLowerCase(), opts);
    p.then(({ name, size, accept, done }) => {
      setFileMeta({ name, size, accept, done });
      // TODO: refactor
      return done;
    })
      .then(() => {
        updateProgress(-1);
      })
      .catch((error: string) => {
        alert("why");
        Promise.reject(detectErrorType(error));
      });
    return p;
  }

  function updateProgressETA(sentBytes: number, totalBytes: number) {
    if (progressTimeoutCancel) {
      progressTimeoutCancel();
    }

    const now = Date.now();
    const secSinceBegin = (now - progressBegin) / 1000;
    const bytesPerSecond = sentBytes / secSinceBegin;
    const bytesRemaining = totalBytes - sentBytes;
    if (progressCounter % updateProgressETAFrequency === 0) {
      setProgressETASeconds(Math.ceil(bytesRemaining / bytesPerSecond));
    }
  }

  return (
    <WormholeContext.Provider
      value={{ code, fileMeta, progressETA, saveFile, sendFile }}
    >
      {props.children}
    </WormholeContext.Provider>
  );
}
