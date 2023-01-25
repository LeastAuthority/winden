import { TransferOptions } from "../types/wormhole";

export function makeProgressFunc(
  onProgress: (sentBytes: number, totalBytes: number) => void
): TransferOptions["progressFunc"] {
  let lastProgressUpdate = Date.now();
  return (sentBytes, totalBytes) => {
    const MS_PER_PROGRESS_UPDATE = 1000;
    const now = Date.now();
    if (
      sentBytes === totalBytes ||
      now - lastProgressUpdate > MS_PER_PROGRESS_UPDATE
    ) {
      onProgress(sentBytes, totalBytes);
      lastProgressUpdate = now;
    }
  };
}
