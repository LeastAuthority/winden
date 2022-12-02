type FileStreamReader = {
  readonly name: string;
  readonly size: number;
  readonly read: (buf: ArrayBuffer) => Promise<[number, boolean]>;
  readonly bufferSizeBytes: number;
  readonly cancel: () => void;
};

type TransferProgress = {
  name?: string;
  size?: number;
  code?: string;
  done: Promise<void>;
  accept?: () => Promise<void>;
  cancel: () => void;
};

type ClientConfig = {
  rendezvousURL: string;
  transitRelayURL: string;
  // TODO: int
  passPhraseComponentLength: number;
};

type TransferOptions = {
  progressFunc?: (sentBytes: number, totalBytes: number) => void;
  code?: string;

  // TODO: keep?
  bufferSizeBytes?: number;

  // TODO: refactor
  name?: string;
  size?: number;
};

type WindowClient = {
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

type WindowWormhole = {
  Client: WindowClient;
};

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
