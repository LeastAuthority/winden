import {
  ClientConfig,
  ClientInterface,
  TransferProgress,
  TransferOptions,
  wormhole,
} from "../app/wormhole/types";
import { FileStreamReader } from "../app/wormhole/streaming";

// TODO: move to own client wrapper lib

export default class Client implements ClientInterface {
  public goClient: number;

  constructor(config?: ClientConfig) {
    this.goClient = wormhole.Client.newClient(config);
  }

  public async sendText(message: string): Promise<string> {
    return wormhole.Client.sendText(this.goClient, message);
  }

  public async sendFile(
    file: File,
    opts?: TransferOptions
  ): Promise<TransferProgress> {
    // XXX get rid of file.name param to sendFile()?
    return wormhole.Client.sendFile(this.goClient, file.name, file, opts);
  }

  public async recvText(code: string): Promise<string> {
    return wormhole.Client.recvText(this.goClient, code);
  }

  public async recvFile(
    code: string,
    opts?: TransferOptions
  ): Promise<FileStreamReader> {
    const readerObj = await wormhole.Client.recvFile(this.goClient, code, opts);
    let bufferSizeBytes = readerObj.bufferSizeBytes;
    if (typeof opts !== "undefined" && opts.bufferSizeBytes) {
      bufferSizeBytes = opts.bufferSizeBytes;
    }
    return new FileStreamReader(bufferSizeBytes, readerObj);
  }

  public free() {
    const err = wormhole.Client.free(this.goClient);
    if (!err) {
      throw err;
    }
  }
}
