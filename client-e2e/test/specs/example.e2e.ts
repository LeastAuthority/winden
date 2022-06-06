import * as path from "path";
import * as Page from "../pageobjects/page";
import { hashFile } from "../util/hashFile";
import { waitForFileExists } from "../util/waitForFileExists";

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

  it.only("1D", async () => {
    const originalFilePath = "/usr/src/app/test/files/hello-world.txt";
    const receivedFilePath = path.join(global.downloadDir, "hello-world.txt");

    await Page.open();
    const _sendWindow = await browser.getWindowHandle();
    await Page.uploadFiles(originalFilePath);
    const input = await $("input[readonly='']");
    const codeUrl = await input.getValue();
    const _receiveWindow = await browser.newWindow(codeUrl);
    await browser.waitUntil(() => $("button").isExisting());
    await (await $("button")).click();
    await browser.call(() => waitForFileExists(receivedFilePath, 60000));
    const originalHash = await hashFile(originalFilePath);
    const receivedHash = await hashFile(receivedFilePath);
    expect(originalHash).toBe(receivedHash);
  });
});
