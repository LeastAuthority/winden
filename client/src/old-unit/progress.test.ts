import Client from "../worker/client";
import { initGo, NewTestFile } from "./util";

const testFileSize = 1024 ** 2; // 1MiB

const config = {
  rendezvousURL: process.env["MAILBOX_URL"] || `ws://192.168.0.191:4000/v1`,
  transitRelayURL: process.env["RELAY_URL"] || `ws://192.168.0.191:4002`,
  passPhraseComponentLength: 2,
};

describe("Send progress", () => {
  beforeAll(initGo);

  it("increments from 0 to total size", async () => {
    const sender = new Client(config);
    const file = NewTestFile("test-file", testFileSize);

    const progressCb = jest.fn();
    const { code } = await sender.sendFile(file as unknown as File, {
      progressFunc: progressCb,
    });

    const receiver = new Client(config);
    const reader = await receiver.recvFile(code!);

    const result = new Uint8Array(testFileSize);
    await reader.readAll(result);

    expect(progressCb).toHaveBeenCalled();
    expect(progressCb.mock.calls.length).toBeGreaterThan(10);

    progressCb.mock.calls.reduce((prevSentBytes, curr, i, arr) => {
      const [sentBytes, totalBytes] = curr;
      expect(sentBytes).toBeGreaterThan(prevSentBytes);
      expect(totalBytes).toEqual(testFileSize);

      return sentBytes;
    }, 0);
  });
});
