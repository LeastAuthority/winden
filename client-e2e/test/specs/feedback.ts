import * as Page from "../pageobjects/page";

describe("Sending feedback", () => {
  describe("when all forms are empty", () => {
    it("will give a validation error", async () => {
      await Page.open();
      const feedbackLink = await $('a[href="/feedback"]');
      await feedbackLink.click();
      const submitButton = await $("button=Submit");
      await submitButton.click();
      const content = await $("body");
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
        const form = await $("#feedback-q1");
        await form.click();
        await browser.keys(["my feedback"]);
      });
      await tryOnlyFill(async () => {
        const form = await $("#feedback-q2");
        await form.click();
        await browser.keys(["my feedback"]);
      });
      await tryOnlyFill(async () => {
        const form = await $("#feedback-q3");
        await form.click();
        await browser.keys(["my feedback"]);
      });
    });
  });
});
