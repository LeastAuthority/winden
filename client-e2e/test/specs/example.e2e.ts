import * as path from "path";
import * as Page from "../pageobjects/page";
import { hashFile } from "../util/hashFile";
import { waitForFileExists } from "../util/waitForFileExists";

async function testTransferSuccess(fileName: string, timeout?: number) {
  const originalFilePath = `/usr/src/app/test/files/${fileName}`;
  const receivedFilePath = path.join(global.downloadDir, fileName);

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
  const originalHash = await hashFile(originalFilePath);
  const receivedHash = await hashFile(receivedFilePath);
  expect(originalHash).toBe(receivedHash);
}

describe("The application", () => {
  it("loads", async () => {
    await Page.open();
    await expect($("[data-testid=send-page-container]")).toBeExisting();
  });

  it("1A/1B", async () => {
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

  it("1C", async () => {
    await Page.open();
    await Page.uploadFiles(
      "/usr/src/app/test/files/hello-world-2.txt",
      "/usr/src/app/test/files/hello-world.txt"
    );

    const content = await $("main");
    await expect(content).toHaveTextContaining("hello-world-2.txt");
    await expect(content).not.toHaveTextContaining("hello-world.txt");
  });

  it("1D", async () => {
    await testTransferSuccess("hello-world.txt");
  });

  it("1E", async () => {
    await testTransferSuccess("sizes/20MB");
  });

  it("1F", async () => {
    await testTransferSuccess("sizes/300MB", 60 * 1000 * 3); // 3 minute timeout
  });

  // it("1G", async () => {
  //   await testTransferSuccess("sizes/4.2GB");
  // });

  // it("1H", async () => {
  //   await testTransferSuccess("sizes/4.3GB");
  // });

  it("2.B", async () => {
    await Page.open();
    await (await Page.receiveButton()).click();
    const input = await Page.receiveCodeInput();
    input.click();
    await browser.keys(["7-gui rev "]);
    await expect(input).toHaveValue("7-guitarist-revenge");
  });
});
