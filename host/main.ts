const { args, exit } = Deno;
import { parse } from "https://deno.land/std@0.132.0/flags/mod.ts";
import { help } from "./cmd_help.ts";
import { run } from "./cmd_run.ts";

const opts = parse(args);

type subCmdFuncType = (args: Array<string | number>) => Promise<0 | 1>;
const cmds = new Map<string, subCmdFuncType>();
cmds.set("help", help);
cmds.set("run", run);

if (opts._.length == 0) {
  opts._.push("help");
}

const subCmd = opts._[0];
if (!cmds.has(subCmd as string)) {
  console.log("error: unrecognized command");
  exit(1);
}
const subCmdArgs = opts._.slice(1);
const subCmdFunc = cmds.get(subCmd as string) as subCmdFuncType;
const exitCode = await subCmdFunc(subCmdArgs);
exit(exitCode);
