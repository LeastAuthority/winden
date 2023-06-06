import { channel } from "redux-saga";
import { cancel, cancelled, fork, put, select, take } from "redux-saga/effects";
import streamSaver from "streamsaver";
import { Client, ReceiveResult, SendResult } from "../../pkg";
import { setError } from "./errorSlice";
import { NoSleep } from "./NoSleep";
import {
  close,
  createStream,
  downloadFile,
  write,
} from "./util/downloader/downloader";
import { makeProgressFunc } from "./util/makeProgressFunc";
import {
  completeLoading,
  completeTransfer,
  requestCancelTransfer,
  reset,
  selectWormholeStatus,
  setConsenting,
  setFileAndCode,
  setIsPeerConnected,
  setRequestingReceive,
  setRequestingSend,
  setTransferProgress,
} from "./wormholeSlice";

streamSaver.mitm = "/mitm.html";

function defer() {
  var res, rej;

  var promise: any = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  promise.resolve = res;
  promise.reject = rej;

  return promise;
}

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

const transferChannel = channel();

export function* watchTransferChannel(): any {
  while (true) {
    const action = yield take(transferChannel);
    yield put(action);
  }
}

let pkg: typeof import("../../pkg");
let client: Client;

function* transfer(): any {
  let cancel: any;
  let writer: WritableStreamDefaultWriter | undefined;
  try {
    while (true) {
      try {
        const { payload } = yield take("wormhole/requestTransfer");
        if (payload.type === "send") {
          cancel = defer();
          yield put(setRequestingSend());
          const sendResult: SendResult = yield pkg.send(client, payload.file);
          yield put(
            setFileAndCode({
              file: {
                name: payload.filename,
                size: payload.file.size,
              },
              code: sendResult.get_code(),
            })
          );
          yield pkg.upload_file(
            sendResult,
            {
              progress: makeProgressFunc((sentBytes, totalBytes) => {
                transferChannel.put(
                  setTransferProgress([sentBytes, totalBytes])
                );
              }),
              on_peer_connected: () => {
                transferChannel.put(setIsPeerConnected());
              },
            },
            cancel
          );
          yield put(completeTransfer());
        } else if (payload.type === "receive") {
          cancel = defer();
          yield put(setRequestingReceive());
          const receiveResult: ReceiveResult = yield pkg.receive(
            client,
            payload.code
          );
          yield put(
            setConsenting({
              name: receiveResult.get_file_name(),
              size: Number(receiveResult.file_size),
            })
          );
          const { payload: consentPayload } = yield take(
            "wormhole/answerConsent"
          );
          if (consentPayload) {
            const fileName = receiveResult.get_file_name();
            const stream = yield createStream(receiveResult.get_file_name());
            yield pkg.download_file(
              receiveResult,
              {
                write: (x: Uint8Array) => {
                  write(stream, x);
                  return Promise.resolve();
                },
                progress: makeProgressFunc((sentBytes, totalBytes) => {
                  transferChannel.put(
                    setTransferProgress([sentBytes, totalBytes])
                  );
                }),
              },
              cancel
            );
            yield close(stream);
            downloadFile(fileName);
            yield put(completeTransfer());
          } else {
            yield pkg.reject_file(receiveResult);
          }
        } else {
          continue;
        }
      } catch (error) {
        console.error(error);
        if (writer) {
          writer.abort();
          writer = undefined;
        }
        yield put(setError(error as string));
        continue;
      }
    }
  } finally {
    if (yield cancelled()) {
      cancel.resolve();
      if (writer) {
        writer.abort();
        writer = undefined;
      }
      yield put(reset());
    }
  }
}

export function* wormholeSaga(): any {
  const pkgImport = import("../../pkg").then((pkg) => pkg.default);
  pkg = yield pkgImport;
  pkg.init();
  client = pkg.Client.new(
    "lothar.com/wormhole/text-or-file-xfer",
    process.env["MAILBOX_URL"] ||
      `wss://${window.location.hostname}:${window.location.port}/mailbox/v1`,
    process.env["RELAY_URL"] ||
      `wss://${window.location.hostname}:${window.location.port}/relay`,
    2
  );
  yield put(completeLoading());
  yield fork(watchForTabExit);
  yield fork(watchForNoSleepDisable);
  yield fork(watchTransferChannel);
  while (true) {
    const transferTask = yield fork(transfer);
    yield take("wormhole/requestCancelTransfer");
    yield cancel(transferTask);
  }
}
