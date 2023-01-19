export type ReadFn = (buf: ArrayBuffer) => Promise<[number, boolean]>;

export interface FileReaderOpts {
  name: string;
  size: number;
  read: ReadFn;
  cancel: () => void;
  reject: () => void;
}

export class FileStreamReader {
  readonly name: string;
  readonly size: number;
  readonly read: ReadFn;
  readonly bufferSizeBytes: number;
  readonly cancel: () => void;
  readonly reject: () => void;

  constructor(bufferSizeBytes: number, opts: FileReaderOpts) {
    const { name, size, read, cancel, reject } = opts;

    this.bufferSizeBytes = bufferSizeBytes;
    this.name = name;
    this.read = read;
    this.size = size;
    this.cancel = cancel;
    this.reject = reject;
  }

  async readAll(result: Uint8Array): Promise<number> {
    let readByteCount = 0;
    for (let n = 0, done = false; !done; ) {
      const buffer = new Uint8Array(new ArrayBuffer(1024 * 4));
      [n, done] = await this.read(buffer);
      result.set(buffer.slice(0, n), readByteCount);
      readByteCount += n;
    }
    return readByteCount;
  }
}
