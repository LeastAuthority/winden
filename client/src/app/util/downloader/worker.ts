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
  filename: string;
  accessHandle: any;
  offset: number;
};

const streams: Record<string, StreamData> = {};

onmessage = async (e: MessageEvent<MessageData>) => {
  if (e.data.type === "createStream") {
    // Get handle to draft file in OPFS
    const root = await navigator.storage.getDirectory();
    const draftHandle = await root.getFileHandle(e.data.id, {
      create: true,
    });
    // Get sync access handle
    // @ts-ignore
    const accessHandle = await draftHandle.createSyncAccessHandle();
    // save for later use
    streams[e.data.id] = {
      filename: e.data.filename,
      accessHandle,
      offset: 0,
    };
    self.postMessage({ type: "streamCreated", id: e.data.id });
  } else if (e.data.type === "write") {
    const stream = streams[e.data.id];
    const bytesWritten = await stream.accessHandle.write(e.data.data, {
      at: stream.offset,
    });
    stream.offset += bytesWritten;
  } else if (e.data.type === "closeStream") {
    const stream = streams[e.data.id];
    stream.accessHandle.flush();
    stream.accessHandle.close();
    self.postMessage({
      type: "streamClosed",
      id: e.data.id,
      filename: streams[e.data.id].filename,
    });
    delete streams[e.data.id];
  }
};
