import React, { PropsWithChildren, useRef, useState } from "react";
import { detectErrorType } from "../util/detectErrorType";
import { durationToClosesUnit } from "../util/durationToClosestUnit";
import ClientWorker from "../wormhole/client_worker";
import {
  ClientConfig,
  TransferOptions,
  TransferProgress,
} from "../wormhole/types";

const MAX_FILE_SIZE_MB = 200;
const MB = 1000 ** 2;
const MAX_FILE_SIZE_BYTES = MB * MAX_FILE_SIZE_MB;
const updateProgressETAFrequency = 10;

const defaultConfig: ClientConfig = {
  rendezvousURL: `ws://${window.location.hostname}:4000/v1`,
  // process.env["VUE_APP_STAGE_MAILBOX_URL"] || "ws://localhost:4000/v1",
  transitRelayURL: `ws://${window.location.hostname}:4002`,
  // process.env["VUE_APP_STAGE_RELAY_URL"] || "ws://localhost:4002",
  passPhraseComponentLength: 2,
};

const enum SendFileError {
  FILE_TOO_LARGE,
}

const enum SaveFileError {}

type Props = PropsWithChildren<{}>;

class Transfer {
  private client = new ClientWorker(defaultConfig);
  private progressBegin = 0;
  private progressCounter = 0;

  private onUpload: (file: Record<string, any>, code?: string) => void;
  private onEta: (eta: number) => void;

  constructor(
    onUpload: (file: Record<string, any>, code?: string) => void,
    onEta: (eta: number) => void
  ) {
    this.onUpload = onUpload;
    this.onEta = onEta;
  }

  public async sendFile(
    file: File,
    opts?: TransferOptions
  ): Promise<TransferProgress | SendFileError> {
    if (opts?.size && opts?.size > MAX_FILE_SIZE_BYTES) {
      console.error("File too large");
      return SendFileError.FILE_TOO_LARGE;
    }

    const progressFunc = (sentBytes: number, totalBytes: number) => {
      this.updateProgressETA(sentBytes, totalBytes);
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

    const p = this.client.sendFile(file, opts);
    p.then(({ code, done }) => {
      this.onUpload(file, code);
      return done;
    })
      .then(() => {
        this.resetProgress();
      })
      .catch((error: string) => Promise.reject(detectErrorType(error)));
    return p;
  }

  public saveFile(code: string): Promise<TransferProgress> | SaveFileError {
    const opts = {
      progressFunc: (sentBytes: number, totalBytes: number) => {
        this.updateProgressETA(sentBytes, totalBytes);
      },
    };

    const p = this.client.saveFile(code.toLowerCase(), opts);
    p.then((file) => {
      this.onUpload(file);
      return file.done;
    })
      .then(() => {
        this.resetProgress();
      })
      .catch((error: string) => {
        console.error("Failed to receive file");
        Promise.reject(detectErrorType(error));
      });
    return p;
  }

  private updateProgressETA(sentBytes: number, totalBytes: number) {
    if (this.progressBegin === 0) {
      this.progressBegin = Date.now();
    }
    this.progressCounter += 1;

    const now = Date.now();
    const secSinceBegin = (now - this.progressBegin) / 1000;
    const bytesPerSecond = sentBytes / secSinceBegin;
    const bytesRemaining = totalBytes - sentBytes;
    if (this.progressCounter % updateProgressETAFrequency === 0) {
      this.onEta(Math.ceil(bytesRemaining / bytesPerSecond));
    }
  }

  private resetProgress() {
    this.progressBegin = 0;
    this.progressCounter = 0;
    this.onEta(0);
  }
}

export const WormholeContext = React.createContext<{
  code?: string;
  fileMeta: Record<string, any> | null;
  progressEta: string;
  saveFile: (code: string) => Promise<TransferProgress> | SaveFileError;
  sendFile: (
    file: File,
    opts?: TransferOptions
  ) => Promise<TransferProgress | SendFileError>;
} | null>(null);

export function WormholeProvider(props: Props) {
  const [fileMeta, setFileMeta] = useState<Record<string, any> | null>(null);
  const [code, setCode] = useState<string | undefined>();
  const [progressEta, setProgressEta] = useState(0);

  const client = useRef<Transfer>(
    new Transfer(
      (file, code) => {
        setFileMeta(file);
        setCode(code);
      },
      (eta) => {
        setProgressEta(eta);
      }
    )
  );

  function sendFile(
    file: File,
    opts?: TransferOptions
  ): Promise<TransferProgress | SendFileError> {
    return client.current.sendFile(file, opts);
  }

  function saveFile(code: string): Promise<TransferProgress> | SaveFileError {
    return client.current.saveFile(code);
  }

  return (
    <WormholeContext.Provider
      value={{
        code,
        fileMeta,
        progressEta: durationToClosesUnit(progressEta),
        saveFile,
        sendFile,
      }}
    >
      {props.children}
    </WormholeContext.Provider>
  );
}
