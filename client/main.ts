import * as val from "../val/val.ts";

export function invoke(v: u64): u64 {
  let i = val.asU32(v);
  // i /= 2;
  // i += 4;
  i += 2;
  return val.asU32Val(i);
}
