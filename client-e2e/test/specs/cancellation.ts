import * as Page from "../pageobjects/page";

describe("Cancellation", () => {
  describe("when sender cancels transfer before receiver enters the code", () => {
    it("will prevent the receiver from getting the file", async () => {
      await Page.open();
      const sendWindow = await browser.getWindowHandle();
      await Page.uploadFiles("/usr/src/app/test/files/sizes/20MB");
      const input = await $("input[readonly='']");
      const codeUrl = await input.getValue();

      await (await $("button*=Cancel")).click();

      const _receiveWindow = await browser.newWindow(codeUrl);
      await browser.pause(30000);
      await expect(await $("button*=Download")).not.toBeExisting();
    });
  });

  describe("Receiver cancellation workaround", () => {
    describe("cancelling during transfer", () => {
      it("Sends the receiver and sender back. The sender gets an error message", async function () {
        // FIXME: flaky test that times out
        this.retries(2);

        await Page.open();
        const sendWindow = await browser.getWindowHandle();
        await Page.uploadFiles("/usr/src/app/test/files/sizes/20MB");
        const input = await $("input[readonly='']");
        const codeUrl = await input.getValue();
        const _receiveWindow = await browser.newWindow(codeUrl);
        await browser.waitUntil(() => $("button*=Download").isExisting());
        await (await $("button*=Download")).click();
        await browser.waitUntil(() => $("button*=Cancel").isExisting());
        await (await $("button*=Cancel")).click();
        await expect(await $("main")).toHaveTextContaining(
          "Receive files in real-time"
        );
        await browser.switchToWindow(sendWindow);
        await browser.waitUntil(async () =>
          (await $("body").getText()).includes("Transfer failed")
        );
      });
    });

    describe("cancelling before transfer", () => {
      it("sends the receiver back", async function () {
        // FIXME: flaky test that times out
        this.retries(2);

        await Page.open();
        const _sendWindow = await browser.getWindowHandle();
        await Page.uploadFiles("/usr/src/app/test/files/sizes/20MB");
        const input = await $("input[readonly='']");
        const codeUrl = await input.getValue();
        const _receiveWindow = await browser.newWindow(codeUrl);
        await browser.waitUntil(() => $("button*=Cancel").isExisting());
        await (await $("button*=Cancel")).click();
        await expect(await $("main")).toHaveTextContaining(
          "Receive files in real-time"
        );
      });
    });
  });

  describe("Sender cancellation workaround", () => {
    describe("cancelling during transfer", () => {
      it("Sends the receiver and sender back. The receiver gets an error message", async function () {
        // FIXME: flaky test that times out
        this.retries(2);

        await Page.open();
        const sendWindow = await browser.getWindowHandle();
        await Page.uploadFiles("/usr/src/app/test/files/sizes/20MB");
        const input = await $("input[readonly='']");
        const codeUrl = await input.getValue();
        const receiveWindow = await browser.newWindow(codeUrl);
        await browser.waitUntil(() => $("button*=Download").isExisting());
        await (await $("button*=Download")).click();

        await browser.switchToWindow(sendWindow);
        await browser.waitUntil(() => $("button*=Cancel").isExisting());
        await (await $("button*=Cancel")).click();
        await expect(await $("main")).toHaveTextContaining(
          "Send files in real-time"
        );
        await browser.switchToWindow(receiveWindow);
        await browser.waitUntil(async () =>
          (await $("body").getText()).includes("Transfer failed")
        );
      });
    });

    describe("cancelling before transfer", () => {
      it("sends the sender back", async function () {
        // FIXME: flaky test that times out
        this.retries(2);

        await Page.open();
        const sendWindow = await browser.getWindowHandle();
        await Page.uploadFiles("/usr/src/app/test/files/sizes/20MB");
        const input = await $("input[readonly='']");
        const codeUrl = await input.getValue();
        const _receiveWindow = await browser.newWindow(codeUrl);
        await browser.switchToWindow(sendWindow);
        await browser.waitUntil(() => $("button*=Cancel").isExisting());
        await (await $("button*=Cancel")).click();
        await expect(await $("main")).toHaveTextContaining(
          "Send files in real-time"
        );
      });
    });
  });
});
