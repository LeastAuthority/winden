import { channel } from "redux-saga";
import { cancel, cancelled, fork, put, select, take } from "redux-saga/effects";
import streamSaver from "streamsaver";
import { Client, ReceiveResult, SendResult } from "../../pkg";
import { setError } from "./errorSlice";
import { NoSleep } from "./NoSleep";
import { makeProgressFunc } from "./util/makeProgressFunc";
import {
  completeLoading,
  completeTransfer,
  reset,
  selectWormholeStatus,
  setConsenting,
  setFileAndCode,
  setRequestingReceive,
  setRequestingSend,
  setTransferProgress,
} from "./wormholeSlice";

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

const downloadFileChannel = channel();

export function* watchDownloadFileChannel(): any {
  while (true) {
    const action = yield take(downloadFileChannel);
    yield put(action);
  }
}

let pkg: typeof import("../../pkg");
let client: Client;

function* transfer(): any {
  let cancel: any;
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
                downloadFileChannel.put(
                  setTransferProgress([sentBytes, totalBytes])
                );
              }),
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
            const fileStream = streamSaver.createWriteStream(
              receiveResult.get_file_name(),
              {
                size: Number(receiveResult.file_size),
              }
            );
            const writer = fileStream.getWriter();
            yield pkg.download_file(
              receiveResult,
              {
                write: (x: unknown) => writer.write(x),
                progress: makeProgressFunc((sentBytes, totalBytes) => {
                  downloadFileChannel.put(
                    setTransferProgress([sentBytes, totalBytes])
                  );
                }),
              },
              cancel
            );
            yield writer.close();
            yield put(completeTransfer());
          } else {
            yield pkg.reject_file(receiveResult);
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
      cancel.resolve();
      yield put(reset());
    }
  }
}

export function* wormholeSaga(): any {
  const pkgImport = import("../../pkg").then((pkg) => pkg.default);
  pkg = yield pkgImport;
  client = pkg.Client.new(
    "lothar.com/wormhole/text-or-file-xfer",
    process.env["MAILBOX_URL"] || `ws://${window.location.hostname}:4000/v1`,
    process.env["RELAY_URL"] || `ws://${window.location.hostname}:4002`,
    2
  );
  yield put(completeLoading());
  yield fork(watchForTabExit);
  yield fork(watchForNoSleepDisable);
  yield fork(watchDownloadFileChannel);
  while (true) {
    const transferTask = yield fork(transfer);
    yield take("wormhole/requestCancelTransfer");
    yield cancel(transferTask);
  }
}
