import * as path from "path";
import * as Page from "../pageobjects/page";
import { hashFile } from "../util/hashFile";
import { waitForFileExists } from "../util/waitForFileExists";

async function testTimeoutSuccess(timeoutMs: number) {
  const originalFilePath = `/usr/src/app/test/files/hello-world.txt`;
  const receivedFilePath = path.join(global.downloadDir, "hello-world.txt");

  // Sender
  await Page.open();
  const _sendWindow = await browser.getWindowHandle();
  await Page.uploadFiles(originalFilePath);
  const codeUrl = await Page.getCodeUrl()

  // Receiver
  const _receiveWindow = await browser.newWindow(codeUrl);
  await browser.waitUntil(() => Page.receiveDownloadButton().isExisting());
  
  await browser.pause(timeoutMs);

  await (await Page.receiveDownloadButton()).click();

  await browser.call(
    () => waitForFileExists(receivedFilePath, 20000) // 20 seconds
  );
  const originalHash = await hashFile(originalFilePath);
  const receivedHash = await hashFile(receivedFilePath);
  await expect(originalHash).toBe(receivedHash);
}

describe("Time out", () => {
  describe("when the receiver waits 1 minutes before accepting the file", () => {
    it("will succeed in connecting and transferring", async () => {
      await testTimeoutSuccess(1 * 60 * 1000);
    });
  });

  describe("when the receiver waits 20 minutes before accepting the file", () => {
    it.skip("will succeed in connecting and transferring", async () => {
      await testTimeoutSuccess(20 * 60 * 1000);
    });
  });

});
