import fs from "fs";
import path from "path";
import Client from "../client";
import Go from "../wasm_exec.d";
import { NewTestFile } from "./util";

const config = {
  rendezvousURL: process.env["MAILBOX_URL"] || `ws://mailbox:4000/v1`,
  transitRelayURL: process.env["RELAY_URL"] || `ws://relay:4002`,
  passPhraseComponentLength: 2,
};

beforeAll(async () => {
  const go = new Go();
  const wasmData = fs.readFileSync(
    path.join(__dirname, "../../../dist/wormhole.wasm")
  );
  await WebAssembly.instantiate(wasmData, go.importObject).then((result) => {
    go.run(result.instance);
  });
});

// NB: cancellation is currently a workaroudn implemented in ClientWorker and
// requires a `Worker` to test. Therefore it is an e2e test until cancellation
// gets properly integrated with wormhole-william.
describe.skip("Cancellation", () => {
  const filename = "sequential.txt";
  const testFileSize = 1024 * 256; // 256 KiB
  const testBufferSize = 1024 * 4;

  describe.skip("Send-side cancellation", () => {
    it("should do things", async () => {
      const readLimit = 1024 * 4; // 8 KiB
      const sender = new Client(config);
      const file = NewTestFile(filename, testFileSize);
      // const {code, cancel, done} = await sender.sendFile(file as unknown as File);
      const senderObj = await sender.sendFile(file as unknown as File);
      const receiver = new Client(config);
      const reader = await receiver.recvFile(senderObj.code!);
      const result = new Uint8Array(testFileSize);

      let readByteCount = 0;
      for (let n = 0, rxDone = false; !rxDone; ) {
        const buffer = new Uint8Array(new ArrayBuffer(1024 * 4));
        [n, rxDone] = await reader.read(buffer);
        result.set(buffer.slice(0, n), readByteCount);
        readByteCount += n;

        if (readByteCount >= readLimit) {
          break;
        }
      }

      await new Promise((f) => setTimeout(f, 1000));
      await expect(senderObj.cancel).rejects.toBe("context canceled");

      const buffer = new Uint8Array(new ArrayBuffer(testBufferSize));
      expect(readByteCount).toEqual(readLimit);

      await expect(senderObj.done).rejects.toBe(
        "failed to read: context canceled"
      );
      console.log(senderObj.done);
      // TODO: get reader to reject with context cancellation error
      // expect(reader.read(buffer)).rejects.toThrow('context cancelled');
    });
  });

  describe.skip("Send-side cancellation before receiver has connected", () => {
    it("should do things", async () => {
      const readLimit = 1024 * 4; // 8 KiB
      const sender = new Client(config);
      const file = NewTestFile(filename, testFileSize);
      const senderObj = await sender.sendFile(file as unknown as File);
      console.log(`Got code: ${senderObj.code}`);

      await expect(senderObj.cancel).resolves.toBe("cancelled");

      // await expect(senderObj.done).rejects.toBe('context cancelled');
      // console.log(senderObj.done);
      // TODO: get reader to reject with context cancellation error
      // expect(reader.read(buffer)).rejects.toThrow('context cancelled');
    });
  });

  describe.skip("Receive-side cancellation", () => {
    it("should do things", async () => {
      // NB: must be multiples of read buffer size.
      const readLimit = 1024 * 8; // 8 KiB
      const sender = new Client(config);
      const file = NewTestFile(filename, testFileSize);
      const { code, done } = await sender.sendFile(file as unknown as File);

      const receiver = new Client(config);
      const reader = await receiver.recvFile(code!);
      const result = new Uint8Array(testFileSize);
      // const readByteCount = await reader.readAll(result)

      let readByteCount = 0;
      const rxDone = false;
      for (let n = 0, rxDone = false; !rxDone; ) {
        const buffer = new Uint8Array(new ArrayBuffer(1024 * 4));
        [n, rxDone] = await reader.read(buffer);
        result.set(buffer.slice(0, n), readByteCount);
        readByteCount += n;

        if (readByteCount >= readLimit) {
          break;
        }
      }

      expect(readByteCount).toEqual(readLimit);
      reader.cancel!();

      const buffer = new Uint8Array(new ArrayBuffer(1024 * 20));
      await expect(reader.read(buffer)).rejects.toBe("context canceled");

      // // Send-side should be cancelled as well.
      // // TODO: use `toThrow(<err msg>)`
      await expect(done).rejects.toEqual("EOF");
      //   'failed to read: WebSocket closed: status = StatusAbnormalClosure and reason = ""'
      // );
    });
  });
});
