import { createAction, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { setError } from "./errorSlice";
import type { RootState } from "./store";

type FileInfo = {
  name: string;
  size: number;
};

type WormholeState =
  | {
      status: "loading";
      file: null;
    }
  | {
      status: "idle";
      file: null;
    }
  | {
      status: "requestingSend";
      file: null;
    }
  | {
      status: "requestingReceive";
      file: null;
    }
  | {
      status: "waiting";
      file: FileInfo;
      code: string;
      startedAt: null;
      isPeerConnected: boolean;
    }
  | {
      status: "consenting";
      file: FileInfo;
      startedAt: null;
    }
  | {
      status: "transferring";
      file: FileInfo;
      sentBytes: number;
      totalBytes: number;
      startedAt: number;
    }
  | {
      status: "done";
      file: FileInfo;
    };

const initialState: WormholeState = {
  status: "loading",
  file: null,
};

// actions
export const completeLoading = createAction<void, "wormhole/completeLoading">(
  "wormhole/completeLoading"
);
export const requestTransfer = createAction<
  | { type: "send"; filename: string; file: File }
  | { type: "receive"; code: string },
  "wormhole/requestTransfer"
>("wormhole/requestTransfer");
export const setFileAndCode = createAction<
  { file: FileInfo; code: string },
  "wormhole/setFileAndCode"
>("wormhole/setFileAndCode");
export const setIsPeerConnected = createAction<
  void,
  "wormhole/setIsPeerConnected"
>("wormhole/setIsPeerConnected");
export const answerConsent = createAction<boolean, "wormhole/answerConsent">(
  "wormhole/answerConsent"
);
export const completeTransfer = createAction<void, "wormhole/completeTransfer">(
  "wormhole/completeTransfer"
);
export const setConsenting = createAction<FileInfo, "wormhole/setConsenting">(
  "wormhole/setConsenting"
);
export const setTransferProgress = createAction<
  [number, number],
  "wormhole/setTransferProgress"
>("wormhole/setTransferProgress");
export const reset = createAction<void, "wormhole/reset">("wormhole/reset");
export const requestCancelTransfer = createAction<
  void,
  "wormhole/requestCancelTransfer"
>("wormhole/requestCancelTransfer");
export const setRequestingSend = createAction<
  void,
  "wormhole/setRequestingSend"
>("wormhole/setRequestingSend");
export const setRequestingReceive = createAction<
  void,
  "wormhole/setRequestingReceive"
>("wormhole/setRequestingReceive");

// reducer
export const wormholeSlice = createSlice<
  WormholeState,
  SliceCaseReducers<WormholeState>
>({
  name: "wormhole",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(completeLoading, (state) => {
        if (state.status === "loading") {
          return {
            status: "idle",
            file: null,
          };
        }
      })
      .addCase(setFileAndCode, (state, action) => {
        if (state.status === "requestingSend") {
          return {
            status: "waiting",
            file: action.payload.file,
            code: action.payload.code,
            startedAt: null,
            isPeerConnected: false,
          };
        }
      })
      .addCase(setIsPeerConnected, (state) => {
        if (state.status === "waiting") {
          return {
            ...state,
            isPeerConnected: true,
          };
        }
      })
      .addCase(completeTransfer, (state) => {
        if (state.status === "transferring") {
          return {
            status: "done",
            file: state.file,
          };
        }
      })
      .addCase(setConsenting, (state, action) => {
        if (state.status === "requestingReceive") {
          return {
            status: "consenting",
            file: action.payload,
            startedAt: null,
          };
        }
      })
      .addCase(setTransferProgress, (state, action) => {
        if (
          state.status === "waiting" ||
          state.status === "consenting" ||
          state.status === "transferring"
        ) {
          return {
            status: "transferring",
            file: state.file,
            sentBytes: action.payload[0],
            totalBytes: action.payload[1],
            startedAt: state.startedAt || Date.now(),
          };
        }
      })
      .addCase(answerConsent, (_state, action) => {
        if (!action.payload) {
          return {
            status: "idle",
            file: null,
          };
        }
      })
      .addCase(setError, () => {
        return {
          status: "idle",
          file: null,
        };
      })
      .addCase(reset, () => {
        return {
          status: "idle",
          file: null,
        };
      })
      .addCase(setRequestingSend, () => {
        return {
          status: "requestingSend",
          file: null,
        };
      })
      .addCase(setRequestingReceive, () => {
        return {
          status: "requestingReceive",
          file: null,
        };
      });
  },
});

// selectors
export const selectIsWormholeLoaded = (state: RootState) =>
  state.wormhole.status !== "loading";
export const selectWormholeStatus = (state: RootState) => state.wormhole.status;
export const selectWormholeCode = (state: RootState) =>
  state.wormhole.status === "waiting" ? state.wormhole.code : null;
export const selectIsPeerConnected = (state: RootState) =>
  state.wormhole.status === "waiting" ? state.wormhole.isPeerConnected : false;
export const selectTransferProgressPercent = (state: RootState) =>
  state.wormhole.status === "transferring"
    ? Math.round((state.wormhole.sentBytes / state.wormhole.totalBytes) * 100)
    : null;
export const selectWormholeFile = (state: RootState) => state.wormhole.file;
export const selectWormholeSentBytes = (state: RootState) =>
  state.wormhole.status === "transferring" ? state.wormhole.sentBytes : null;
export const selectWormholeEta = (state: RootState) => {
  if (state.wormhole.status === "transferring") {
    const now = Date.now();
    const secSinceBegin = (now - state.wormhole.startedAt) / 1000;
    const bytesPerSecond = state.wormhole.sentBytes / secSinceBegin;
    const bytesRemaining = state.wormhole.totalBytes - state.wormhole.sentBytes;
    return Math.ceil(bytesRemaining / bytesPerSecond);
  } else {
    return null;
  }
};

export default wormholeSlice.reducer;
