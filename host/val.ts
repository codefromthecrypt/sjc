const { readFile } = Deno;
import { Pattern } from "https://deno.land/x/regexbuilder@1.6.1/mod.ts";
import * as hostfns from "./host_fns.ts";

const importObj = { env: hostfns };
const file = await readFile("val.wasm");
const wasmModule = new WebAssembly.Module(file);
const wasmInstance = new WebAssembly.Instance(wasmModule, importObj);
const isU63 = wasmInstance.exports["isU63"] as CallableFunction;
const isU32 = wasmInstance.exports["isU32"] as CallableFunction;
const isI32 = wasmInstance.exports["isI32"] as CallableFunction;
const asU63 = wasmInstance.exports["asU63"] as CallableFunction;
const asU32 = wasmInstance.exports["asU32"] as CallableFunction;
const asI32 = wasmInstance.exports["asI32"] as CallableFunction;
const asU63Val = wasmInstance.exports["asU63Val"] as CallableFunction;
const asU32Val = wasmInstance.exports["asU32Val"] as CallableFunction;
const asI32Val = wasmInstance.exports["asI32Val"] as CallableFunction;

export function asString(v: bigint): string {
  if (isU63(v)) {
    return `u63(${asU63(v)})`;
  }
  if (isI32()) {
    return `i32(${asI32(v)})`;
  }
  if (isU32()) {
    return `u32(${asU32(v)})`;
  }
  return `unknown(${v})`;
}

export function fromString(s: string): bigint {
  const match = Pattern.new()
    .settings({
      template: "(type)\\((value)\\)",
    })
    .vars({
      type: ["u63", "u32", "i32"],
      value: ".*",
    })
    .build()
    .matchMap(s);
  switch (match?.type) {
    case "u63":
      return asU63Val(BigInt(match?.value));
    case "u32": {
      const n: number = BigInt(match?.value) as unknown as number;
      const b: bigint = asU32Val(n);
      return b;
    }
    case "i32":
      return asI32Val(BigInt(match?.value));
    case undefined:
    default:
      throw new Error();
  }
  return 0n;
}
