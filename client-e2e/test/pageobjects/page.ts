export const homePageUrl = `https://client:8080`;

export async function open() {
  const url = await browser.url(homePageUrl);
  await browser.waitUntil(async () => $('main[data-testid="App"').isExisting());
  return url;
}

export async function uploadFiles(...files: string[]) {
  await browser.executeScript(
    `const input = document.querySelector("input[type=file]");
    input.style.visibility = 'visible';
    input.style.height = '1px';
    input.style.width = '1px';
    input.style.opacity = 1;
    input.style.display = 'block';`.replace("\n", ""),
    []
  );
  const remoteFilePaths = await Promise.all(
    files.map((f) => browser.uploadFile(f))
  );
  await $("input[type=file]").setValue(remoteFilePaths.join("\n"));
}

export async function getCode() {
  return await $("div[data-testid=code-generated]");
}

export async function getCodeUrl() {
  const code = await $("div[data-testid=code-generated]");
  return homePageUrl + "/#" + (await code.getText());
}

export async function receiveButton() {
  return await $("button[data-testid=go-to-receive-page]");
}

export function receiveDownloadButton() {
  return $("button[data-testid=receive-download-button]");
}

export function copyLinkButton() {
  return $("button[data-testid=copy-link-button]");
}

export function cancelButton() {
  return $("button[data-testid=send-page-cancel-button]");
}

export function receiveCodeInput() {
  return $("input[data-testid=code-input]");
}

export function submitCodeButton() {
  return $("span=Next");
}

export function progressBar() {
  return $("div[role=progressbar]");
}
