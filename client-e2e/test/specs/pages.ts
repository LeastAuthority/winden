import * as Page from "../pageobjects/page";

describe("Check internal Pages", () => {
    it("if About Us opens", async () => {
      await Page.open();

      expect(await $("main")).toHaveTextContaining(
        "Send files in real-time"
      );

      await $('a[to="/about"').click();
      
      expect(await $("main")).toHaveTextContaining(
        "Winden is a free web"
      );
    });

    it("if FAQ opens", async () => {
        
        await $('a[to="/faq"').click();
        
        expect(await $("main")).toHaveTextContaining(
          "What makes Winden different?"
        );
    });
    
    it("if Privacy opens", async () => {
        
        await $('a[to="/privacy"').click();
        
        expect(await $("main")).toHaveTextContaining(
          "Who we are"
        );
    });

    it("if Privacy opens", async () => {
        
        await $('a[to="/for-business"').click();
        
        expect(await $("main")).toHaveTextContaining(
          "Interested in bringing Winden"
        );
    });

    it("if Feedback opens", async () => {
        
        await $('a[to="/feedback"').click();
        
        expect(await $("main")).toHaveTextContaining(
          "Loving Winden?"
        );
    });

    describe("Check Terms", () => {
        it("if Terms & Conditions opens as link", async () => {
        
            await $('a[to="/terms"').click();
            
            expect(await $("h1")).toHaveTextContaining(
              "GENERAL TERMS AND CONDITIONS"
            );
        });
        it("if Terms & Conditions is present in Sender block and opens", async () => {
            await Page.open();
            
            expect(await $("main")).toHaveTextContaining(
                "Send files in real-time"
            );
            
            expect(await $("main")).toHaveTextContaining(
                "By using Winden you agree to the"
            );

            await $('a[to="/terms"').click();
            
            expect(await $("h1")).toHaveTextContaining(
                "GENERAL TERMS AND CONDITIONS"
            );
        });

        it("if Terms & Conditions is present in Receiver block and opens", async () => {
            
            await Page.open();
            // Sender
            const _sendWindow = await browser.getWindowHandle();
            await Page.uploadFiles("./test/files/sizes/20MB");
            const codeUrl = await Page.getCodeUrl()

            // Receiver
            const _receiveWindow = await browser.newWindow(codeUrl);
            await browser.waitUntil(() => Page.receiveDownloadButton().isExisting());

            expect(await $("main")).toHaveTextContaining(
                "Ready to download"
            );

            expect(await $("main")).toHaveTextContaining(
                "By using Winden you agree to the"
            );

            await $('a[href="/terms"').click();

            await browser.switchWindow('/terms')
            //await browser.waitUntil(() => Page.($("h1")))
            
            expect(await $("h1")).toHaveTextContaining(
                "GENERAL TERMS AND CONDITIONS"
            );

            
        });
    });
});

describe("Check external Pages", () => {

    it("if Winden Github opens", async () => {

        await Page.open();
        expect(await $('a[href="https://github.com/LeastAuthority/winden"').isExisting());
    
    });
});