import * as Page from "../pageobjects/page";

describe("Cancellation", () => {
  describe("when Sender cancels transfer before Receiver enters the code", () => {
    // TODO improve test, when Receiver side gets error handling implementation
    it("check if file is not downloadable anymore", async () => {
      await Page.open();

      await browser.getWindowHandle();

      await Page.uploadFiles("./test/files/sizes/20MB");
      const codeUrl = await Page.getCodeUrl();

      await (await Page.cancelButton()).click();

      await browser.pause(2000);
      const receiveWindow = await browser.newWindow(codeUrl);

      await browser.pause(20000);
      // check if Download button is not available
      await expect(await Page.receiveDownloadButton()).not.toBeExisting();
    }, 2);
  });

  describe("Receiver cancellations", () => {
    describe("Rejects file when offer is received", () => {
      it("Sends the Sender back and show cancellation message, no message for Receiver", async function () {
        await Page.open();
        const sendWindow = await browser.getWindowHandle();
        await Page.uploadFiles("./test/files/sizes/20MB");

        const codeUrl = await Page.getCodeUrl();
        const _receiveWindow = await browser.newWindow(codeUrl);

        // Receiver
        await browser.waitUntil(() => Page.cancelButton().isExisting());
        await (await Page.cancelButton()).click();
        await expect(await $("main")).toHaveTextContaining(
          "Receive files in real-time"
        );
        // Sender
        await browser.switchToWindow(sendWindow);
        await expect(
          await $("p*=The receiver rejected this transfer.").isExisting()
        );
      });
    });

    describe("Cancel during transfer", () => {
      it("Sends the Receiver and Sender back. The Sender gets an error message", async function () {
        await Page.open();
        const sendWindow = await browser.getWindowHandle();
        await Page.uploadFiles("./test/files/sizes/20MB");

        const codeUrl = await Page.getCodeUrl();
        const _receiveWindow = await browser.newWindow(codeUrl);

        // Receiver
        await browser.waitUntil(() =>
          Page.receiveDownloadButton().isExisting()
        );
        await (await Page.receiveDownloadButton()).click();

        await browser.waitUntil(() => Page.progressBar().isExisting());
        await (await Page.cancelButton()).click();

        await expect(await $("main")).toHaveTextContaining(
          "Receive files in real-time"
        );

        // Sender
        await browser.switchToWindow(sendWindow);
        await browser.waitUntil(
          async () =>
            await $("div*=Transfer cancelled/interrupted").isExisting()
        );
      });
      it("(after 5 sec.) Sends the Receiver and Sender back. The Sender gets an error message", async function () {
        await Page.open();
        const sendWindow = await browser.getWindowHandle();
        await Page.uploadFiles("./test/files/sizes/20MB");

        const codeUrl = await Page.getCodeUrl();
        const _receiveWindow = await browser.newWindow(codeUrl);

        // Receiver
        await browser.waitUntil(() =>
          Page.receiveDownloadButton().isExisting()
        );
        await (await Page.receiveDownloadButton()).click();

        await browser.waitUntil(() => Page.progressBar().isExisting());
        browser.pause(5000);
        await (await Page.cancelButton()).click();

        await expect(await $("main")).toHaveTextContaining(
          "Receive files in real-time"
        );

        // Sender
        await browser.switchToWindow(sendWindow);
        await browser.waitUntil(
          async () =>
            await $("div*=Transfer cancelled/interrupted").isExisting()
        );
      });
    });
  });

  describe("Sender cancellation", () => {
    describe("Cancel during transfer", () => {
      it("Sends the Receiver and Sender back. The Receiver gets an error message", async function () {
        await Page.open();
        const sendWindow = await browser.getWindowHandle();
        await Page.uploadFiles("./test/files/sizes/20MB");
        const codeUrl = await Page.getCodeUrl();

        // Receiver
        const receiveWindow = await browser.newWindow(codeUrl);
        await browser.waitUntil(() =>
          Page.receiveDownloadButton().isExisting()
        );
        await (await Page.receiveDownloadButton()).click();

        // Sender
        await browser.switchToWindow(sendWindow);
        await browser.waitUntil(() => Page.progressBar().isExisting());
        await (await Page.cancelButton()).click();
        await expect(await $("main")).toHaveTextContaining(
          "Send files in real-time"
        );

        // Receiver
        await browser.switchToWindow(receiveWindow);
        await browser.waitUntil(
          async () =>
            await $("div*=Transfer cancelled/interrupted").isExisting()
        );
      });
    });

    describe("Cancel before accepted transfer", () => {
      it("Sends the Sender back with no message", async function () {
        await Page.open();
        const sendWindow = await browser.getWindowHandle();
        await Page.uploadFiles("./test/files/sizes/20MB");
        const codeUrl = await Page.getCodeUrl();

        const _receiveWindow = await browser.newWindow(codeUrl);
        await browser.switchToWindow(sendWindow);
        await browser.waitUntil(() => Page.cancelButton().isExisting());
        await (await Page.cancelButton()).click();
        await expect(await $("main")).toHaveTextContaining(
          "Send files in real-time"
        );
      });
      // TODO not implemented functionality
      it.skip("Receiver get cancellation messages after pressing Download", async function () {});
      // TODO not implemented functionality
      it.skip("Receiver get cancellation messages after pressing Cancel", async function () {});
    });
  });
});
