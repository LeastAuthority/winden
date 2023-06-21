import { nanoid } from "nanoid";

// @ts-ignore
const worker = new Worker(new URL("./worker.ts", import.meta.url));
const cleanerWorker = new Worker(
  // @ts-ignore
  new URL("./cleanerWorker.ts", import.meta.url)
);

type StreamData = {
  ready: boolean;
};

const streams: Record<string, StreamData> = {};

function waitFor(fn: () => boolean) {
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (fn()) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}

export async function createStream(filename: string): Promise<string> {
  const id = nanoid();
  worker.postMessage({ type: "createStream", id, filename });
  streams[id] = { ready: false };
  await waitFor(() => {
    return streams[id].ready;
  });
  return id;
}

export function write(id: string, data: Uint8Array) {
  worker.postMessage({ type: "write", id, data });
}

export async function close(id: string) {
  worker.postMessage({ type: "closeStream", id });
  await waitFor(() => {
    return !streams[id];
  });
}

worker.addEventListener("message", async (e) => {
  if (e.data.type === "streamCreated") {
    streams[e.data.id].ready = true;
  } else if (e.data.type === "streamClosed") {
    const directoryHandle = await navigator.storage.getDirectory();
    const fileHandle = await directoryHandle.getFileHandle(e.data.id);
    const file = await fileHandle.getFile();

    var link = document.createElement("a");
    link.download = e.data.filename;
    link.href = URL.createObjectURL(file);
    link.click();
    delete streams[e.data.id];
  }
});
