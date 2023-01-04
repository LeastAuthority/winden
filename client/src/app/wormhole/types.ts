// TODO: declare local interface instead of import?
import { FileStreamReader } from "./streaming";

export interface TransferProgress {
  name?: string;
  size?: number;
  code?: string;
  done: Promise<void>;
  accept?: () => Promise<void>;
  cancel: () => void;
  reject: () => void;
}

export type ProgressFunc = (sentBytes: number, totalBytes: number) => void;

export interface TransferOptions {
  progressFunc?: ProgressFunc;
  code?: string;

  // TODO: keep?
  bufferSizeBytes?: number;

  // TODO: refactor
  name?: string;
  size?: number;
}

export interface ClientInterface {
  // TODO: readonly or at least protected.
  goClient: number;

  sendText(msg: string): Promise<string>;

  recvText(code: string): Promise<string>;

  sendFile(file: File, opts?: TransferOptions): Promise<TransferProgress>;

  recvFile(code: string, opts?: TransferOptions): Promise<FileStreamReader>;

  free(): void;
}

export interface WindowWormhole {
  Client: WindowClient;
}

export interface WindowClient {
  newClient(config?: ClientConfig): number;

  sendText(goClient: number, message: string): Promise<string>;

  sendFile(
    goClient: number,
    fileName: string,
    file: File,
    opts?: TransferOptions
  ): Promise<TransferProgress>;

  recvText(goClient: number, code: string): Promise<string>;

  recvFile(
    goClient: number,
    code: string,
    opts?: TransferOptions
  ): Promise<FileStreamReader>;

  free(goClient: number): string | undefined;
}

export interface ClientConfig {
  rendezvousURL: string;
  transitRelayURL: string;
  // TODO: int
  passPhraseComponentLength: number;
}

export const wormhole: WindowWormhole = new Proxy(
  { Client: {} as WindowClient },
  {
    get(target, prop, receiver) {
      switch (prop) {
        case "Client":
          return (globalThis as any).Wormhole.Client;
      }
    },
  }
);
