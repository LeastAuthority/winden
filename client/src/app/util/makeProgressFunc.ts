import { TransferOptions } from "../types/wormhole";
import { PROGRESS_BAR_MS_PER_UPDATES } from "./constants";

export function makeProgressFunc(
  onProgress: (sentBytes: number, totalBytes: number) => void
): TransferOptions["progressFunc"] {
  let lastProgressUpdate = Date.now();
  return (sentBytes, totalBytes) => {
    const now = Date.now();
    if (
      sentBytes === totalBytes ||
      now - lastProgressUpdate > PROGRESS_BAR_MS_PER_UPDATES
    ) {
      onProgress(sentBytes, totalBytes);
      lastProgressUpdate = now;
    }
  };
}
