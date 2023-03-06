// TODO: error handling

export async function loadAndRunWasm() {
  const wasmPromise = fetch("/wormhole.wasm");
  const go = new Go();
  let wasm: { instance: WebAssembly.Instance };
  if (typeof WebAssembly.instantiateStreaming === "undefined") {
    const wasmData = await (await wasmPromise).arrayBuffer();
    wasm = await WebAssembly.instantiate(wasmData, go.importObject);
  } else {
    wasm = await WebAssembly.instantiateStreaming(wasmPromise, go.importObject);
  }
  go.run(wasm.instance);
}
