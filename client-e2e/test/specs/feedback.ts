import * as Page from "../pageobjects/page";

describe("Sending feedback", () => {
  describe("when all forms are empty", () => {
    it("will give a validation error", async () => {
      await Page.open();
      const feedbackLink = await $('a[href="/feedback"]');
      await feedbackLink.click();
      const form = await $('[name="whatsGreat"]');
      await form.click();
      const content = await $("body");
      await content.click();
      await expect(content).toHaveTextContaining(
        "The form is empty. Please fill out the form."
      );
    });
  });

  describe("when at least one part of the form is filled in", () => {
    it("will submit successfully", async () => {
      async function tryOnlyFill(fillFn: () => Promise<void>) {
        const feedbackLink = await $('a[href="/feedback"]');
        await feedbackLink.click();
        await fillFn();
        const submitButton = await $("button=Submit");
        await submitButton.click();
        const content = await $("body");
        await expect(content).toHaveTextContaining(
          "Your feedback has been submitted successfully."
        );
      }

      await Page.open();

      await tryOnlyFill(async () => {
        await $("aria/5").click();
      });
      await tryOnlyFill(async () => {
        const form = await $('[name="whatsGreat"]');
        await form.click();
        await browser.keys(["my feedback"]);
      });
      await tryOnlyFill(async () => {
        const form = await $('[name="whatsUseful"]');
        await form.click();
        await browser.keys(["my feedback"]);
      });
      await tryOnlyFill(async () => {
        const form = await $('[name="whatsNotGreat"]');
        await form.click();
        await browser.keys(["my feedback"]);
      });
    });
  });

  describe("when one of the textareas exceed the character limit", () => {
    it("will show an error", async () => {
      const me = "a".repeat(2001);
      async function tryOnlyFill(fillFn: () => Promise<void>) {
        const feedbackLink = await $('a[href="/feedback"]');
        await feedbackLink.click();
        await fillFn();
        const submitButton = await $("button=Submit");
        await submitButton.click();
        const content = await $("body");
        await expect(content).toHaveTextContaining(
          "Content should not exceed 2000 characters."
        );
      }

      await Page.open();

      await tryOnlyFill(async () => {
        const form = await $('[name="whatsGreat"]');
        await form.click();
        await browser.keys([me]);
      });
      await tryOnlyFill(async () => {
        const form = await $('[name="whatsUseful"]');
        await form.click();
        await browser.keys([me]);
      });
      await tryOnlyFill(async () => {
        const form = await $('[name="whatsNotGreat"]');
        await form.click();
        await browser.keys([me]);
      });
    });
  });
});
