export function help(_args: Array<string | number>): Promise<0 | 1> {
  console.log(`sr: Invoke functions in wasm files.

Usage:
  Run func: sr run <wasm file> <func> [arg0] [arg1] ...

Example:
  sr run mod.wasm myfunc 'i32(0)' 'u63(987)'

Subcommands:
  help   Show this help
  run    Run a wasm file
`);
  return Promise.resolve(0);
}
