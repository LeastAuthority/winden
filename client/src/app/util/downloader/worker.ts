const MIN_FLUSH_AMOUNT_BYTES = 10000000;

export type MessageData =
  | {
      type: "createStream";
      id: string;
      filename: string;
    }
  | {
      type: "write";
      id: string;
      data: Uint8Array;
    }
  | {
      type: "closeStream";
      id: string;
    };

type StreamData = {
  accessHandle: any;
  unflushedBytes: number;
};

const streams: Record<string, StreamData> = {};

window.addEventListener("message", async (e: MessageEvent<MessageData>) => {
  if (e.data.type === "createStream") {
    // Get handle to draft file in OPFS
    const root = await navigator.storage.getDirectory();
    const draftHandle = await root.getFileHandle("filename", {
      create: true,
    });
    // Get sync access handle
    // @ts-ignore
    const accessHandle = await draftHandle.createSyncAccessHandle();
    // save for later use
    streams[e.data.id] = { accessHandle, unflushedBytes: 0 };
    self.postMessage({ data: { type: "streamCreated", id: e.data.id } });
  } else if (e.data.type === "write") {
    const stream = streams[e.data.id];
    stream.unflushedBytes += await stream.accessHandle.write(e.data.data);
    if (stream.unflushedBytes >= MIN_FLUSH_AMOUNT_BYTES) {
      stream.accessHandle.flush();
      stream.unflushedBytes = 0;
    }
  } else if (e.data.type === "closeStream") {
    const stream = streams[e.data.id];
    if (stream.unflushedBytes) {
      stream.accessHandle.flush();
    }
    stream.accessHandle.close();
    delete streams[e.data.id];
    self.postMessage({ data: { type: "streamClosed", id: e.data.id } });
  }
});
