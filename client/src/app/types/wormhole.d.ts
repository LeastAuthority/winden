export type TransferOptions = {
  progressFunc?: (sentBytes: number, totalBytes: number) => void;
  code?: string;
  bufferSizeBytes?: number;
  name?: string;
  size?: number;
};

type TransferProgress = {
  name?: string;
  size?: number;
  code?: string;
  done: Promise<void>;
  accept?: () => Promise<void>;
  cancel: () => void;
  reject?: () => Promise<void>;
};

type FileStreamReader = {
  readonly name: string;
  readonly size: number;
  readonly read: (buf: ArrayBuffer) => Promise<[number, boolean]>;
  readonly bufferSizeBytes: number;
  readonly cancel: () => void;
  readonly reject: () => void;
};

type ClientConfig = {
  rendezvousURL: string;
  transitRelayURL: string;
  passPhraseComponentLength: number;
};

declare global {
  interface Window {
    Wormhole: {
      Client: {
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
      };
    };
  }
}
