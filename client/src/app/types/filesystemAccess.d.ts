export {};

declare global {
  interface Window {
    showSaveFilePicker?: (opts: {}) => Promise<{
      createWritable: () => Promise<WritableStream>;
    }>;
  }
}
