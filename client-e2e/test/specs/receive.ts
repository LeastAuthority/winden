import * as Page from "../pageobjects/page";
import { homePageUrl } from "../pageobjects/page";

describe("Receive flow", () => {
  it("can use the spacebar key for word autocompletion", async () => {
    await Page.open();
    await (await Page.receiveButton()).click();
    const input = await Page.receiveCodeInput();
    await input.click();
    await browser.keys(["7-gui rev "]);
    await expect(input).toHaveValue("7-guitarist-revenge");
  });

  describe("when entering a code with improper format", () => {
    it("will tell the user that the code has the wrong format", async () => {
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
  });

  describe("when entering a code with proper format", () => {
    describe("the code has an invalid namplate number and code", () => {
      it.skip("will display a bad code error", async () => {
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
    });

    describe("the code has an valid namplate number but valid code", () => {
      it("will display a bad code error", async () => {
        await Page.open();
        await Page.uploadFiles("/usr/src/app/test/files/hello-world.txt");
        const receiveUrl = await (await $("input[readonly='']")).getValue();
        const re = new RegExp(
          `^http://${process.env.HOST_IP}:8080/#(\\d+)-\\w+-\\w+$`
        );
        const nameplate = parseInt(receiveUrl.match(re)[1]);

        const _receiveWindow = await browser.newWindow(homePageUrl);
        await (await Page.receiveButton()).click();
        const input = await Page.receiveCodeInput();
        await input.click();
        // very high chance the 2 words are not guitarist-revenge
        await browser.keys([`${nameplate}-guitarist-revenge`]);
        await (await Page.submitCodeButton()).click();
        await browser.waitUntil(
          async () =>
            (
              await $("body").getText()
            ).includes(
              "Either the sender is no longer connected, or the code was already used."
            ),
          {
            timeout: 10000,
            timeoutMsg: "expected bad code error",
          }
        );
      });
    });
  });
});
