import { PROGRESS_BAR_MS_PER_UPDATES } from "./constants";

export function makeProgressFunc(
  onProgress: (sentBytes: number, totalBytes: number) => void
) {
  let lastProgressUpdate = Date.now();
  return (sentBytes: bigint, totalBytes: bigint) => {
    const now = Date.now();
    if (
      sentBytes === totalBytes ||
      now - lastProgressUpdate > PROGRESS_BAR_MS_PER_UPDATES
    ) {
      onProgress(Number(sentBytes), Number(totalBytes));
      lastProgressUpdate = now;
    }
  };
}
