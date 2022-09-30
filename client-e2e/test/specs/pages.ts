import * as Page from "../pageobjects/page";

describe("Check internal Pages", () => {
    it("if About Us opens", async () => {
      await Page.open();
      const sendWindow = await browser.getWindowHandle();
      await expect(await $("main")).toHaveTextContaining(
        "Send files in real-time"
      );

      await $('a[href="/about"').click();
      
      await expect(await $("main")).toHaveTextContaining(
        "Winden is a free web"
      );
    });

    it("if FAQ opens", async () => {
        
        await $('a[href="/faq"').click();
        
        await expect(await $("main")).toHaveTextContaining(
          "What makes Winden different?"
        );
    });
    
    it("if Privacy opens", async () => {
        
        await $('a[href="/privacy"').click();
        
        await expect(await $("main")).toHaveTextContaining(
          "Who we are"
        );
    });

    it("if Privacy opens", async () => {
        
        await $('a[href="/for-business"').click();
        
        await expect(await $("main")).toHaveTextContaining(
          "Interested in bringing Winden"
        );
    });

    it("if Feedback opens", async () => {
        
        await $('a[href="/feedback"').click();
        
        await expect(await $("main")).toHaveTextContaining(
          "Loving Winden?"
        );
    });

    describe("Check Terms", () => {
        it("if Terms & Conditions opens as link", async () => {
        
            await $('a[href="/terms"').click();
            
            await expect(await $("main")).toHaveTextContaining(
              "GENERAL TERMS AND CONDITIONS"
            );
        });
        it("if Terms & Conditions is present in Sender block and opens", async () => {
            await Page.open();
            const sendWindow = await browser.getWindowHandle();
            await expect(await $("main")).toHaveTextContaining(
                "Send files in real-time"
            );
            
            await expect(await $("main")).toHaveTextContaining(
                "By using Winden you agree to the"
            );

            await $('a[href="/terms"').click();
            
            await expect(await $("main")).toHaveTextContaining(
                "GENERAL TERMS AND CONDITIONS"
            );
        });

        it("if Terms & Conditions is present in Receiver block and opens", async () => {
            
            await Page.open();
            const _sendWindow = await browser.getWindowHandle();
            await Page.uploadFiles("/usr/src/app/test/files/sizes/20MB");
            const codeUrl = await Page.getCodeUrl()

            const _receiveWindow = await browser.newWindow(codeUrl);
            await expect(await $("main")).toHaveTextContaining(
                "Receive files in real-time"
            );

            await expect(await $("main")).toHaveTextContaining(
                "By using Winden you agree to the"
            );

            await $('a[href="/terms"').click();
            
            await expect(await $("main")).toHaveTextContaining(
                "GENERAL TERMS AND CONDITIONS"
            );
        });
    });
});

describe("Check external Pages", () => {

    it("if Winden Github opens", async () => {

        await Page.open();
        const sendWindow = await browser.getWindowHandle();
        await expect(await $('a[href="https://github.com/LeastAuthority/winden"').isExisting());
    
    });
});