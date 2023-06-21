import * as Page from "../pageobjects/page";

describe("Check internal Pages", () => {
  it("if About Us opens", async () => {
    await Page.open();

    await expect(await $("main")).toHaveTextContaining(
      "Send files in real-time"
    );

    await $('a[href="/about"]').click();

    await expect(await $("main")).toHaveTextContaining("Winden is a free web");
  });

  it("if FAQ opens", async () => {
    await Page.open();

    await $('a[href="/faq"]').click();

    await expect(await $("main")).toHaveTextContaining(
      "What makes Winden different?"
    );
  });

  it("if Privacy opens", async () => {
    await Page.open();

    await $('a[href="/privacy"]').click();

    await expect(await $("main")).toHaveTextContaining("Who we are");
  });

  it("if Privacy opens", async () => {
    await Page.open();

    await $('a[href="/for-business"]').click();

    await expect(await $("main")).toHaveTextContaining(
      "Interested in bringing Winden"
    );
  });

  it("if Feedback opens", async () => {
    await Page.open();

    await $('a[href="/feedback"]').click();

    await expect(await $("main")).toHaveTextContaining("Loving Winden?");
  });

  describe("Check Terms", () => {
    it("if Terms & Conditions opens as link", async () => {
      await Page.open();

      await $('a[href="/terms"]').click();

      await expect(await $("h1")).toHaveTextContaining(
        "GENERAL TERMS AND CONDITIONS"
      );
    });
    it("if Terms & Conditions is present in Sender block and opens", async () => {
      await Page.open();

      await expect(await $("main")).toHaveTextContaining(
        "Send files in real-time"
      );

      await expect(await $("main")).toHaveTextContaining(
        "By using Winden you agree to the"
      );

      await $('a[href="/terms"]').click();

      await expect(await $("h1")).toHaveTextContaining(
        "GENERAL TERMS AND CONDITIONS"
      );
    });

    it("if Terms & Conditions is present in Receiver block and opens", async () => {
      await Page.open();
      // Sender
      const _sendWindow = await browser.getWindowHandle();
      await Page.uploadFiles("./test/files/sizes/20MB.bin");
      const codeUrl = await Page.getCodeUrl();

      // Receiver
      const _receiveWindow = await browser.newWindow(codeUrl);
      await browser.waitUntil(() => Page.receiveDownloadButton().isExisting());

      await expect(await $("main")).toHaveTextContaining("Ready to download");

      await expect(await $("main")).toHaveTextContaining(
        "By using Winden you agree to the"
      );

      await $('a[href="/terms"]').click();

      await browser.switchWindow("/terms");
      //await browser.waitUntil(() => Page.($("h1")))

      await expect(await $("h1")).toHaveTextContaining(
        "GENERAL TERMS AND CONDITIONS"
      );
    });
  });
});

describe("Check external Pages", () => {
  it("if Winden Github opens", async () => {
    await Page.open();
    await expect(
      await $('a[href="https://github.com/LeastAuthority/winden"]').isExisting()
    );
  });
});
