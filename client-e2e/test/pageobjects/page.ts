export const homePageUrl = `http://${process.env.HOST_IP}:8080`;

export function open() {
  return browser.url(homePageUrl);
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

export function receiveButton() {
  return $("span*=Receive");
}

export function receiveCodeInput() {
  return $("input[data-testid=code-input]");
}

export function submitCodeButton() {
  return $("span=Next");
}
