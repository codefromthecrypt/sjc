export function abort(
  _message: number,
  _fileName: number,
  line: number,
  column: number,
) {
  console.error("abort:", `line=${line}`, `col=${column}`);
}

export function log_value(v: BigInt): BigInt {
  console.log("log:", v);
  return 0n;
}
