import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useCodeInput } from "../../hooks/useCodeInput";
import { useError } from "../../hooks/useError";
import { detectErrorType, ErrorTypes } from "../../util/errors";
import ClientWorker from "../../wormhole/client_worker";
import {
  ClientConfig,
  TransferOptions,
  TransferProgress,
} from "../../wormhole/types";

const updateProgressETAFrequency = 10;

const defaultConfig: ClientConfig = {
  rendezvousURL:
    process.env["MAILBOX_URL"] || `ws://${window.location.hostname}:4000/v1`,
  transitRelayURL:
    process.env["RELAY_URL"] || `ws://${window.location.hostname}:4002`,
  passPhraseComponentLength: 2,
};

type Props = PropsWithChildren<{}>;

class Transfer {
  private client: ClientWorker;
  private progressBegin = 0;
  private progressCounter = 0;

  private onUpload: (file: Record<string, any>, code?: string) => void;
  private onEta: (eta: number | null) => void;
  private onDone: () => void;
  private onBytes: (bytes: number) => void;

  constructor(
    onUpload: (file: Record<string, any>, code?: string) => void,
    onEta: (eta: number | null) => void,
    onDone: () => void,
    onBytes: (bytes: number) => void,
    onWasmExit: () => void
  ) {
    this.onUpload = onUpload;
    this.onEta = onEta;
    this.onDone = onDone;
    this.onBytes = onBytes;
    this.client = new ClientWorker(defaultConfig, onWasmExit);
  }

  public async sendFile(
    file: File,
    opts?: TransferOptions
  ): Promise<TransferProgress> {
    const progressFunc = (sentBytes: number, totalBytes: number) => {
      this.onBytes(sentBytes);
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
    }).then(() => {
      this.resetProgress();
      this.onDone();
    });

    return p;
  }

  public saveFile(code: string): Promise<TransferProgress> {
    const opts = {
      progressFunc: (sentBytes: number, totalBytes: number) => {
        this.onBytes(sentBytes);
        this.updateProgressETA(sentBytes, totalBytes);
      },
    };

    const p = this.client.saveFile(code.toLowerCase(), opts);
    p.then((file) => {
      this.onUpload(file);
      return file.done;
    }).then(() => {
      this.resetProgress();
      this.onDone();
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
    this.onEta(null);
  }
}

export const WormholeContext =
  React.createContext<{
    code?: string;
    fileMeta: Record<string, any> | null;
    progressEta: number | null;
    saveFile: (code: string) => Promise<TransferProgress | void>;
    sendFile: (
      file: File,
      opts?: TransferOptions
    ) => Promise<TransferProgress | void>;
    done: boolean;
    reset: () => void;
    bytesSent: number;
  } | null>(null);

export default function WormholeProvider(props: Props) {
  const [fileMeta, setFileMeta] = useState<Record<string, any> | null>(null);
  const [code, setCode] = useState<string | undefined>();
  const [progressEta, setProgressEta] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const error = useError();
  const [bytesSent, setBytesSent] = useState(0);
  const codeInput = useCodeInput();

  const client = useRef<Transfer>();
  useEffect(() => {
    client.current = new Transfer(
      (file, code) => {
        setFileMeta(file);
        setCode(code);
      },
      (eta) => {
        setProgressEta(eta);
      },
      () => {
        setDone(true);
      },
      (bytes: number) => {
        setBytesSent(bytes);
      },
      () => {
        error?.setError(ErrorTypes.WASM_EXITED);
      }
    );
  }, []);

  async function sendFile(
    file: File,
    opts?: TransferOptions
  ): Promise<TransferProgress | void> {
    return client.current?.sendFile(file, opts).catch((e: any) => {
      error?.setError(detectErrorType(e));
    });
  }

  async function saveFile(code: string): Promise<TransferProgress | void> {
    return client.current?.saveFile(code).catch((e: any) => {
      error?.setError(detectErrorType(e));
    });
  }

  function reset() {
    codeInput?.setValue("");
    codeInput?.setSubmitting(false);
    setFileMeta(null);
    setCode(undefined);
    setProgressEta(null);
    setDone(false);
  }

  return (
    <WormholeContext.Provider
      value={{
        code,
        fileMeta,
        progressEta: progressEta || null,
        saveFile,
        sendFile,
        done,
        reset,
        bytesSent,
      }}
    >
      {props.children}
    </WormholeContext.Provider>
  );
}
