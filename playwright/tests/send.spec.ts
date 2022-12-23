import test, { BrowserContext, expect, Page } from "@playwright/test";
import crypto from "crypto";
import fs from "fs";
import path from "path";

function hashFile(file: string) {
  return new Promise((res) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(file);

    stream.on("data", (data: string) => {
      hash.update(data, "utf8");
    });

    stream.on("end", () => {
      res(hash.digest("hex"));
    });
  });
}

async function testTransferSuccess(
  page: Page,
  context: BrowserContext,
  filePath: string
) {
  await page.goto("http://localhost:8080");
  await uploadFile(page, filePath);
  await findCodeCopyButton(page).click();

  const page2 = await context.newPage();
  await page2.goto(await getClipboardContent(page));
  const [download] = await downloadAndWait(page2);

  const downloadPath = path.join(
    __dirname,
    `./downloads/${download.suggestedFilename()}`
  );

  await download.saveAs(downloadPath);

  await expect(findConfetti(page)).toBeVisible();
  await expect(findConfetti(page2)).toBeVisible();
  expect(await hashFile(downloadPath)).toEqual(await hashFile(filePath));
}

test.describe("Sending a file", () => {
  test.beforeEach(({ context }) => {
    context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

  test.afterEach(() => {
    fs.rmSync(path.join(__dirname, "./downloads"), { recursive: true });
  });

  test("The file has zero bytes", async ({ page, context }) => {
    await testTransferSuccess(
      page,
      context,
      path.join(__dirname, "files/sizes/0-bytes")
    );
  });

  test("The file size is <1MB", async ({ page, context }) => {
    await testTransferSuccess(
      page,
      context,
      path.join(__dirname, "files/hello.txt")
    );
  });

  test("The file size is 5MB", async ({ page, context }) => {
    await testTransferSuccess(
      page,
      context,
      path.join(__dirname, "files/sizes/5MB")
    );
  });

  test("The file size is 20MB", async ({ page, context }) => {
    test.slow();
    await testTransferSuccess(
      page,
      context,
      path.join(__dirname, "files/sizes/20MB")
    );
  });

  test("The file size is over 200MB", async ({ page }) => {
    await uploadFile(page, path.join(__dirname, "files/sizes/over-200MB"));
    await expect(
      page.getByRole("dialog", { name: "Large file sizes: coming soon" })
    ).toBeVisible();
  });

  test.describe("When the sender tries to send the same file twice", () => {
    test("It succeeds both times", async ({ page, context }) => {
      test.slow();

      await page.goto("http://localhost:8080");

      await uploadFile(page, path.join(__dirname, "files/hello.txt"));
      await findCodeCopyButton(page).click();

      const pageReceiver1 = await context.newPage();
      await pageReceiver1.goto(await getClipboardContent(page));
      await downloadAndWait(pageReceiver1);

      await clickSendMoreButton(page);
      await pageReceiver1.close();

      await uploadFile(page, path.join(__dirname, "files/hello.txt"));
      await findCodeCopyButton(page).click();

      const pageReceiver2 = await context.newPage();
      await pageReceiver2.goto(await getClipboardContent(page));
      await downloadAndWait(pageReceiver2);

      await expect(findConfetti(page)).toBeVisible();
      await expect(findConfetti(pageReceiver2)).toBeVisible();
    });
  });

  test.describe("The generated code", () => {
    test("Copying the code url to clipboard", async ({ page }) => {
      await page.goto("http://localhost:8080/");
      await page.setInputFiles(
        'input[type="file"]',
        path.join(__dirname, "files/hello.txt")
      );
      await page.getByTestId("copy-link-button").click();
      const code = await page.getByTestId("code-generated").innerText();
      expect(await page.evaluate(() => navigator.clipboard.readText())).toEqual(
        `http://localhost:8080/#${code}`
      );
    });
  });
});

test.describe("Uploading multiple files", () => {
  test("It will give an error", async ({ page }) => {
    await page.goto("http://localhost:8080/");
    await uploadFile(page, [
      path.join(__dirname, "files/hello.txt"),
      path.join(__dirname, "files/sizes/5MB"),
    ]);
    await expect(
      page.getByRole("dialog", { name: "One at a time please :)" })
    ).toBeVisible();
  });
});

function clickSendMoreButton(page: Page) {
  return page.getByText("Send more").click();
}

function getClipboardContent(page: Page) {
  return page.evaluate(() => navigator.clipboard.readText());
}

function findCodeCopyButton(page: Page) {
  return page.getByTestId("copy-link-button");
}

function downloadAndWait(page: Page) {
  return Promise.all([
    page.waitForEvent("download"),
    page.getByTestId("receive-download-button").click(),
  ]);
}

function findConfetti(page: Page) {
  return page.getByText("🎉");
}

function uploadFile(page: Page, filePath: string | string[]) {
  return page.setInputFiles('input[type="file"]', filePath);
}
