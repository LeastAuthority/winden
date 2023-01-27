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

  await Page.open();
  const _sendWindow = await browser.getWindowHandle();
  await Page.uploadFiles(originalFilePath);
  const content = await $("body");
  expect(content).toHaveTextContaining("Large file sizes: coming soon");
}

describe("Send flow", () => {
  describe("on uploading a single file", () => {
    it("check generated code format", async () => {
      await Page.open();
      await Page.uploadFiles("./test/files/hello-world.txt");

      const code = await Page.getCode()
      
      const expectedCode = /^\d+-\w+-\w+$/;
      expect(code.getValue).toHaveValue(expectedCode);

      const content = await $("main");
      expect(content).toHaveTextContaining("hello-world.txt");
    });
    //TODO requires switch to https in dev
    it.skip("can copy generate link", async () => {});
  });

  describe("when uploading zero bytes file", () => {
    //TODO bug on firefox, cannot download
    it.skip("will transfer successfully", async () => {
      await testTransferSuccess("zero.file");
    });
  });

  describe("when uploading a file <1MB", () => {
    it("will transfer successfully", async () => {
      await testTransferSuccess("hello-world.txt");
    });
  });

  describe("when uploading a file with the size of 5MB", () => {
    it("will transfer successfully", async () => {
      // 100 sec.
      await testTransferSuccess("sizes/5MB", 100000);
    });
  });

  describe("when uploading a file with the size of 20MB", () => {
    // TODO: enable, when speed issue fixed, currently fails with Firefox
    it.skip("will transfer successfully", async () => {
      // 100 sec.
      await testTransferSuccess("sizes/20MB", 100000);
    });
  });

  describe("when a sender tries to send the same file twice", () => {
    it("will successfully upload the file both times", async () => {
      await Page.open();
      await Page.uploadFiles("./test/files/hello-world.txt");
      await (await $("button*=Cancel")).click();
      await Page.uploadFiles("./test/files/hello-world.txt");
      expect(await $("main")).toHaveTextContaining("Ready to send!");
    });
  });
});
