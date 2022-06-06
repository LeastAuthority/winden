import * as Page from "../pageobjects/page";

describe("The application", () => {
  it("loads", async () => {
    await Page.open();
    await expect($("[data-testid=send-page-container]")).toBeExisting();
  });

  it("1A/1B", async () => {
    await Page.open();
    await Page.uploadFiles("/usr/src/app/test/files/hello-world.txt");

    const input = await $("input[readonly='']");
    const re = new RegExp(
      `^http://${process.env.HOST_IP}:8080/#/\\d+-\\w+-\\w+$`
    );
    await expect(input).toHaveValue(re);

    const content = await $("main");
    await expect(content).toHaveTextContaining("hello-world.txt");
  });

  it("1C", async () => {
    await Page.open();
    await Page.uploadFiles(
      "/usr/src/app/test/files/hello-world-2.txt",
      "/usr/src/app/test/files/hello-world.txt"
    );

    const content = await $("main");
    await expect(content).toHaveTextContaining("hello-world-2.txt");
    await expect(content).not.toHaveTextContaining("hello-world.txt");
  });
});
