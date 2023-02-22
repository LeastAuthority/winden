import * as Page from "../pageobjects/page";
import { homePageUrl } from "../pageobjects/page";

describe("Receive flow", () => {
  it("can use the spacebar key for word autocompletion", async () => {
    await Page.open();
    await (await Page.receiveButton()).click();
    const input = await Page.receiveCodeInput();
    await input.click();
    await browser.keys(["7-gui rev "]);
    expect(input).toHaveValue("7-guitarist-revenge");
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
      expect(content).toHaveTextContaining(
        "Please use a code with the number-word-word format."
      );
    });
  });

  describe("when entering a code with proper format", () => {
    describe("the code has correct format, but nameplate is not used", () => {
      it("will display a bad code error", async () => {
        await Page.open();
        await (await Page.receiveButton()).click();
        const input = await Page.receiveCodeInput();
        await input.click();

        // max nameplate number 999, so will not impact real nameplate
        await browser.keys(["1000-guitarist-revenge"]);
        await (await Page.submitCodeButton()).click();
        await browser.waitUntil(
          async () => await $("div*=The code is wrong").isExisting()
        );
      });
    });

    describe("the code has unknown word and nameplate is not used", () => {
      it("will display a bad code error", async () => {
        await Page.open();
        await (await Page.receiveButton()).click();
        const input = await Page.receiveCodeInput();
        await input.click();

        // max nameplate number 999, so will not impact real nameplate
        await browser.keys(["1000-guitarist-unknown"]);
        await (await $("body")).click();
        await browser.waitUntil(
          async () => await $("div*=Second word is not recognized").isExisting()
        );
      });
    });

    describe("the code has an existing nameplate number but invalid code", () => {
      it("will display a bad code error", async () => {
        await Page.open();
        await Page.uploadFiles("./test/files/hello-world.txt");

        const codeUrl = await Page.getCodeUrl();
        const re = new RegExp(
          `^http://${process.env.HOST_IP}:8080/#(\\d+)-\\w+-\\w+$`
        );
        const nameplate = parseInt(codeUrl.match(re)[1]);

        const _receiveWindow = await browser.newWindow(homePageUrl);
        await (await Page.receiveButton()).click();
        const input = await Page.receiveCodeInput();
        await input.click();
        // very high chance the 2 words are not guitarist-revenge
        await browser.keys([`${nameplate}-guitarist-revenge`]);
        await (await Page.submitCodeButton()).click();
        await browser.waitUntil(
          async () => await $("div*=The code is wrong").isExisting()
        );
      });
    });
  });
});
