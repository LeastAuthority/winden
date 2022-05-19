// NB: tried @types/golang-wasm
declare class Go {
  constructor();
  importObject: Record<string, Record<string, any>>;
  run(instance: any): any;
}
export default Go;
