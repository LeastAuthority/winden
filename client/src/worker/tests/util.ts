import path from "path";
import fs from "fs";
import Go from "../wasm_exec.d";

export interface TestFile {
  name: string;
  size: number;
  arrayBuffer(): ArrayBuffer;
}

export function newTestFile(name: string, size = 1024): TestFile {
  return {
    name,
    size,
    arrayBuffer(): ArrayBuffer {
      return new ArrayBuffer(size);
    },
  };
}

export async function initGo() {
  const go = new Go();
  const wasmPath = path.join(__dirname, "../../../dist/wormhole.wasm");
  await WebAssembly.instantiate(
    fs.readFileSync(wasmPath),
    go.importObject
  ).then((result) => {
    go.run(result.instance);
  });
}

export type TestBlob =
  | {
      name: string;
      size: number;
      data: DataView;
      arrayBuffer: () => Promise<ArrayBuffer>;
      slice: (start: number, end: number) => TestBlob;
    }
  | {
      size: number;
      data: Uint8Array;
      arrayBuffer: () => Promise<ArrayBuffer>;
    };

export function NewTestFile(name: string, fileSizeBytes: number): TestBlob {
  const data = new DataView(new ArrayBuffer(fileSizeBytes));
  data.buffer;
  for (let i = 0; i < data.byteLength; i++) {
    data.setUint8(i, i);
  }

  return {
    name,
    size: fileSizeBytes,
    data,
    arrayBuffer(): Promise<ArrayBuffer> {
      return Promise.resolve(data.buffer);
    },
    slice(start: number, end: number): TestBlob {
      let size = 0;
      if (end >= fileSizeBytes) {
        end = fileSizeBytes;
      }
      size = end - start;
      if (start >= fileSizeBytes) {
        size = 0;
      }

      const sliceData = new Uint8Array(data.buffer).subarray(
        start,
        start + size
      );

      return {
        size: size,
        data: sliceData,
        arrayBuffer(): Promise<ArrayBuffer> {
          const buf = new Uint8Array(sliceData.buffer).subarray(
            start,
            start + size
          );
          return Promise.resolve(buf);
        },
      };
    },
  };
}

export function mockReadFn(file: TestBlob, bufSizeBytes: number) {
  let counter = 0;
  return jest.fn().mockImplementation((buf) => {
    const dataView = new DataView(buf);
    for (let i = 0; i < bufSizeBytes; i++) {
      dataView.setUint8(
        i,
        (file.data as DataView).getUint8(bufSizeBytes * counter + i)
      );
      if (bufSizeBytes * counter + i === file.data.byteLength - 1) {
        return Promise.resolve([i + 1, true]);
      }
    }
    counter++;
    return Promise.resolve([bufSizeBytes, false]);
  });
}
