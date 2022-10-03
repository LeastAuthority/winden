import * as path from "path";
import * as Page from "../pageobjects/page";
import { hashFile } from "../util/hashFile";
import { waitForFileExists } from "../util/waitForFileExists";

async function testTransferSuccess(fileName: string, timeout?: number) {
  const originalFilePath = path.join("./test/files/", fileName);
  const receivedFilePath = path.join(
    global.downloadDir,
    path.basename(fileName)
  );

  await Page.open();
  const _sendWindow = await browser.getWindowHandle();
  await Page.uploadFiles(originalFilePath);

  // Receiver
  const codeUrl = await Page.getCodeUrl()
  const _receiveWindow = await browser.newWindow(codeUrl);

  await browser.waitUntil(() => Page.receiveDownloadButton().isExisting());
  await (await Page.receiveDownloadButton()).click();

  await browser.call(() =>
    waitForFileExists(receivedFilePath, timeout || 120000)
  );

  await browser.waitUntil(async () => {
    const originalHash = await hashFile(originalFilePath);
    const receivedHash = await hashFile(receivedFilePath);
    return originalHash === receivedHash;
  });
}

async function testTransferFailure(fileName: string, timeout?: number) {
  const originalFilePath = path.join("./test/files/", fileName);
  const receivedFilePath = path.join(
    global.downloadDir,
    path.basename(fileName)
  );

  await Page.open();
  const _sendWindow = await browser.getWindowHandle();
  await Page.uploadFiles(originalFilePath);
  const content = await $("body");
  await expect(content).toHaveTextContaining("Large file sizes: coming soon");
}

describe("Send flow large files", () => {

  describe("when uploading a file with the size of 300MB", () => {
    it("will tell the user that the file is too large", async () => {
      await testTransferFailure("sizes/300MB");
    });
  });

  describe("when uploading a file with the size of 4.2GB", () => {
    it("will tell the user that the file is too large", async function () {
      this.timeout(120000);
      await testTransferFailure("sizes/4.2GB");
    });
  });

  describe("when uploading a file with the size of 4.3GB", () => {
    it("will tell the user that the file is too large", async function () {
      this.timeout(120000);
      await testTransferFailure("sizes/4.3GB");
    });
  });

});
