async function cleanup() {
  console.log("Executing cleanup");
  const directoryHandle = await navigator.storage.getDirectory();
  const now = Date.now();
  // @ts-ignore
  for await (const [filename, handle] of directoryHandle.entries()) {
    const file: File = await handle.getFile();
    if (now >= file.lastModified + 60000) {
      console.log(`Deleting ${filename}`);
      directoryHandle.removeEntry(filename);
    }
  }
}

cleanup();

setInterval(() => {
  cleanup();
}, 30000);
