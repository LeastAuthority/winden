import * as Page from "../pageobjects/page";

describe("My Login application", () => {
  it("should login with valid credentials", async () => {
    await Page.open();
    await expect($("[data-testid=send-page-container]")).toBeExisting();
  });
});
