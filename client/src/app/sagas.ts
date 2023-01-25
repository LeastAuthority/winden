import { cancel, cancelled, fork, put, select, take } from "redux-saga/effects";
import streamSaver from "streamsaver";
import { setError } from "./errorSlice";
import { loadAndRunWasm } from "./loadAndRunWasm";
import { NoSleep } from "./NoSleep";
import { FileStreamReader, TransferProgress } from "./types/wormhole";
import {
  completeLoading,
  completeTransfer,
  reset,
  selectWormholeStatus,
  setConsenting,
  setFileAndCode,
  setRequestingReceive,
  setRequestingSend,
} from "./wormholeSlice";

function* watchForNoSleepDisable() {
  while (true) {
    yield take("*");
    const status: ReturnType<typeof selectWormholeStatus> = yield select(
      selectWormholeStatus
    );
    if (status === "idle" || status === "done") {
      NoSleep.disable();
    }
  }
}

export function* watchForTabExit() {
  function onTabExit(ev: BeforeUnloadEvent) {
    ev.preventDefault();
    return (ev.returnValue =
      "Closing this tab will cancel the ongoing transfer. Are you sure you want to close?");
  }

  while (true) {
    yield take("*");
    const status: ReturnType<typeof selectWormholeStatus> = yield select(
      selectWormholeStatus
    );
    window.addEventListener("beforeunload", onTabExit);
    if (status === "idle" || status === "done") {
      window.removeEventListener("beforeunload", onTabExit);
    }
  }
}

let client: number;

function* transfer(): any {
  let cancellable: TransferProgress | FileStreamReader;
  try {
    while (true) {
      try {
        const { payload } = yield take("wormhole/requestTransfer");
        if (payload.type === "send") {
          yield put(setRequestingSend());
          cancellable = yield window.Wormhole.Client.sendFile(
            client,
            payload.filename,
            payload.file,
            payload.opts
          );
          yield put(
            setFileAndCode({
              file: {
                name: payload.filename,
                size: payload.file.size,
              },
              code: (cancellable as TransferProgress).code!,
            })
          );
          yield (cancellable as TransferProgress).done;
          yield put(completeTransfer());
        } else if (payload.type === "receive") {
          yield put(setRequestingReceive());
          cancellable = yield window.Wormhole.Client.recvFile(
            client,
            payload.code,
            payload.opts
          );
          yield put(
            setConsenting({
              name: (cancellable as FileStreamReader).name,
              size: (cancellable as FileStreamReader).size,
            })
          );
          const { payload: consentPayload } = yield take(
            "wormhole/answerConsent"
          );
          if (consentPayload) {
            const fileStream = streamSaver.createWriteStream(
              (cancellable as FileStreamReader).name,
              {
                size: (cancellable as FileStreamReader).size,
              }
            );
            const writer = fileStream.getWriter();

            let done = false;
            while (!done) {
              const buffer = new Uint8Array(
                (cancellable as FileStreamReader).bufferSizeBytes
              );
              [, done] = yield (cancellable as FileStreamReader).read(buffer);

              writer.write(buffer);
            }

            yield writer.close();
            yield put(completeTransfer());
          } else {
            (cancellable as FileStreamReader).reject();
          }
        } else {
          continue;
        }
      } catch (error) {
        console.error(error);
        yield put(setError(error as string));
        continue;
      }
    }
  } finally {
    if (yield cancelled()) {
      cancellable!.cancel();
      yield put(reset());
    }
  }
}

export function* wormholeSaga(): any {
  yield loadAndRunWasm();
  client = window.Wormhole.Client.newClient({
    rendezvousURL:
      process.env["MAILBOX_URL"] || `ws://${window.location.hostname}:4000/v1`,
    transitRelayURL:
      process.env["RELAY_URL"] || `ws://${window.location.hostname}:4002`,
    passPhraseComponentLength: 2,
  });
  yield put(completeLoading());
  yield fork(watchForTabExit);
  yield fork(watchForNoSleepDisable);
  while (true) {
    const transferTask = yield fork(transfer);
    yield take("wormhole/requestCancelTransfer");
    yield cancel(transferTask);
  }
}
