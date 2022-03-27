const { readFile } = Deno;
import * as hostfns from "./host_fns.ts";
import * as val from "./val.ts";

export async function run(args: Array<string | number>): Promise<0 | 1> {
  if (args.length > 0 && args.length < 2) {
    console.error("error: at least two arguments required see --help");
    return 1;
  }
  const filePath = args[0] as string;
  const funcName = args[1] as string;
  const funcArgs = args.slice(2);

  const importObj = { env: hostfns };
  const file = await readFile(filePath);
  const wasmModule = new WebAssembly.Module(file);
  const wasmInstance = new WebAssembly.Instance(wasmModule, importObj);

  console.log("Imports:", WebAssembly.Module.imports(wasmModule));
  console.log("Exports:", wasmInstance.exports);
  console.log("Func:", funcName);
  console.log("Args:", ...funcArgs);

  const funcArgsInts = funcArgs.map((v) => val.fromString(v as string));
  console.log("Args (raw):", ...funcArgsInts);

  const func = wasmInstance.exports[funcName] as CallableFunction;
  const retVal = func(funcArgsInts);
  console.log("Return (raw):", retVal);
  console.log("Return:", val.asString(retVal));
  return 0;
}
