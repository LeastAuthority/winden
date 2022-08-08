import Client from "../worker/client";
import { initGo, NewTestFile } from "./util";

const testFileSize = 1024 ** 2; // 1MiB

describe("Send progress", () => {
  beforeAll(initGo);

  it("increments from 0 to total size", async () => {
    const sender = new Client();
    const file = NewTestFile("test-file", testFileSize);

    const progressCb = jest.fn();
    const { code } = await sender.sendFile(file as unknown as File, {
      progressFunc: progressCb,
    });

    const receiver = new Client();
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
