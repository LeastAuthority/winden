import * as path from "path";
import * as Page from "../pageobjects/page";
import { hashFile } from "../util/hashFile";
import { waitForFileExists } from "../util/waitForFileExists";

async function testTransferSuccess(fileName: string, timeout?: number) {
  const originalFilePath = path.join("/usr/src/app/test/files/", fileName);
  const receivedFilePath = path.join(
    global.downloadDir,
    path.basename(fileName)
  );

  await Page.open();
  const _sendWindow = await browser.getWindowHandle();
  await Page.uploadFiles(originalFilePath);
  const input = await $("input[readonly='']");
  const codeUrl = await input.getValue();
  const _receiveWindow = await browser.newWindow(codeUrl);
  await browser.waitUntil(() => $("button").isExisting());
  await (await $("button")).click();
  await browser.call(() =>
    waitForFileExists(receivedFilePath, timeout || 60000)
  );
  await browser.waitUntil(async () => {
    const originalHash = await hashFile(originalFilePath);
    const receivedHash = await hashFile(receivedFilePath);
    return originalHash === receivedHash;
  });
}

async function testTransferFailure(fileName: string, timeout?: number) {
  const originalFilePath = path.join("/usr/src/app/test/files/", fileName);
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

describe("Send flow", () => {
  describe("on uploading a single file", () => {
    it("will generate a code", async () => {
      await Page.open();
      await Page.uploadFiles("/usr/src/app/test/files/hello-world.txt");

      const input = await $("input[readonly='']");
      const re = new RegExp(
        `^http://${process.env.HOST_IP}:8080/#/\\d+-\\w+-\\w+$`
      );
      await expect(input).toHaveValue(re);

      const content = await $("main");
      await expect(content).toHaveTextContaining("hello-world.txt");
    });
  });

  describe("on uploading multiple files", () => {
    it("will only upload the first file", async () => {
      await Page.open();
      await Page.uploadFiles(
        "/usr/src/app/test/files/hello-world-2.txt",
        "/usr/src/app/test/files/hello-world.txt"
      );

      const content = await $("main");
      await expect(content).toHaveTextContaining("hello-world-2.txt");
      await expect(content).not.toHaveTextContaining("hello-world.txt");
    });
  });

  describe("when uploading a file less than 1MB", () => {
    it("will transfer successfully", async () => {
      await testTransferSuccess("hello-world.txt");
    });
  });

  describe("when uploading a file with the size of 20MB", () => {
    it("will transfer successfully", async () => {
      await testTransferSuccess("sizes/20MB");
    });
  });

  describe("when uploading a file with the size of 300MB", () => {
    it("will tell the user that the file is too large", async () => {
      await testTransferFailure("sizes/300MB");
    });
  });

  describe("when uploading a file with the size of 4.2GB", () => {
    it("will tell the user that the file is too large", async () => {
      await testTransferFailure("sizes/4.2GB");
    });
  });

  describe("when uploading a file with the size of 4.3GB", () => {
    it("will tell the user that the file is too large", async () => {
      await testTransferFailure("sizes/4.3GB");
    });
  });

  describe("when a sender tries to send the same file twice", () => {
    it("will successfully upload the file both times", async () => {
      await Page.open();
      await Page.uploadFiles("/usr/src/app/test/files/hello-world.txt");
      await (await $("button*=Cancel")).click();
      await Page.uploadFiles("/usr/src/app/test/files/hello-world.txt");
      await expect(await $("main")).toHaveTextContaining("Ready to send!");
    });
  });
});
