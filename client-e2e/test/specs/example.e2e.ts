import * as path from "path";
import * as Page from "../pageobjects/page";
import { homePageUrl } from "../pageobjects/page";
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
  const originalHash = await hashFile(originalFilePath);
  const receivedHash = await hashFile(receivedFilePath);
  await expect(originalHash).toBe(receivedHash);
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
    await testTransferFailure("sizes/300MB");
  });

  it("1G", async () => {
    await testTransferFailure("sizes/4.2GB");
  });

  it("1H", async () => {
    await testTransferFailure("sizes/4.3GB");
  });

  it("2.B", async () => {
    await Page.open();
    await (await Page.receiveButton()).click();
    const input = await Page.receiveCodeInput();
    await input.click();
    await browser.keys(["7-gui rev "]);
    await expect(input).toHaveValue("7-guitarist-revenge");
  });

  it("2.C", async () => {
    await Page.open();
    await (await Page.receiveButton()).click();
    const input = await Page.receiveCodeInput();
    await input.click();
    await browser.keys(["revenge-guitarist-7"]);
    const content = await $("main");
    await content.click();
    await expect(content).toHaveTextContaining(
      "Please use a code with the number-word-word format."
    );
  });

  it.skip("2.D", async () => {
    await Page.open();
    await (await Page.receiveButton()).click();
    const input = await Page.receiveCodeInput();
    await input.click();
    await browser.keys(["7-guitarist-revenge"]);
    await (await Page.submitCodeButton()).click();
    await browser.waitUntil(
      async () => (await $("body").getText()).includes("bad code error"),
      {
        timeout: 10000,
        timeoutMsg: "expected bad code error",
      }
    );
  });

  it.skip("2.E", async () => {
    await Page.open();
    await Page.uploadFiles("/usr/src/app/test/files/hello-world.txt");
    const receiveUrl = await (await $("input[readonly='']")).getValue();
    const re = new RegExp(
      `^http://${process.env.HOST_IP}:8080/#/(\\d+)-\\w+-\\w+$`
    );
    const nameplate = parseInt(receiveUrl.match(re)[1]);

    const _receiveWindow = await browser.newWindow(homePageUrl);
    await (await Page.receiveButton()).click();
    const input = await Page.receiveCodeInput();
    await input.click();
    // very high change the 2 words are not guitarist-revenge
    await browser.keys([`${nameplate}-guitarist-revenge`]);
    await (await Page.submitCodeButton()).click();
    await browser.waitUntil(
      async () => (await $("body").getText()).includes("bad code error"),
      {
        timeout: 10000,
        timeoutMsg: "expected bad code error",
      }
    );
  });

  it.skip("3.A", async () => {
    await testTimeoutSuccess(5 * 60 * 1000);
  });

  it.skip("3.B", async () => {
    await testTimeoutSuccess(20 * 60 * 1000);
  });

  // it.skip("3.C", async () => {
  //   await testTimeoutSuccess(2 * 60 * 60 * 1000);
  // });
});
