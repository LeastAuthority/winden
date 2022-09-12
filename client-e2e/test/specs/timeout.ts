import * as path from "path";
import * as Page from "../pageobjects/page";
import { hashFile } from "../util/hashFile";
import { waitForFileExists } from "../util/waitForFileExists";

async function testTimeoutSuccess(timeoutMs: number) {
  const originalFilePath = `/usr/src/app/test/files/hello-world.txt`;
  const receivedFilePath = path.join(global.downloadDir, "hello-world.txt");

  await Page.open();
  const _sendWindow = await browser.getWindowHandle();
  await Page.uploadFiles(originalFilePath);
  const input = await $("input[readonly='']");
  const codeUrl = await input.getValue();
  const _receiveWindow = await browser.newWindow(codeUrl);
  await browser.waitUntil(() => $("button").isExisting());

  await browser.pause(timeoutMs);

  await (await $("button")).click();
  await browser.call(
    () => waitForFileExists(receivedFilePath, 10000) // 10 seconds
  );
  const originalHash = await hashFile(originalFilePath);
  const receivedHash = await hashFile(receivedFilePath);
  await expect(originalHash).toBe(receivedHash);
}

describe("Time out", () => {
  describe("when the receiver waits 5 minutes before accepting the file", () => {
    it("will succeed in connecting and transferring", async () => {
      await testTimeoutSuccess(5 * 60 * 1000);
    });
  });

  describe("when the receiver waits 20 minutes before accepting the file", () => {
    it.skip("will succeed in connecting and transferring", async () => {
      await testTimeoutSuccess(20 * 60 * 1000);
    });
  });

  // it.skip("3.C", async () => {
  //   await testTimeoutSuccess(2 * 60 * 60 * 1000);
  // });
});
