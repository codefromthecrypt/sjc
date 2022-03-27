type Val = u64;

const valObjVoid: u64 = 0;
const valObjBoolTrue: u64 = 1;
const valObjBoolFalse: u64 = 2;

type tag = u8;

const tagU32: tag = 1;
const tagI32: tag = 2;

export function isU63(v: Val): bool {
  return (v & 1) == 0;
}

function getTag(v: Val): tag {
  return ((v >> 1) & 7) as tag;
}

function hasTag(v: Val, t: tag): bool {
  return !isU63(v) && getTag(v) == t;
}

function getBody(v: Val): u64 {
  return v >> 4;
}

export function isI32(v: Val): bool {
  return hasTag(v, tagI32);
}

export function isU32(v: Val): bool {
  return hasTag(v, tagU32);
}

export function asU63(v: Val): u64 {
  assert(isU63(v));
  return v >> 1;
}

export function asI32(v: Val): i32 {
  assert(isI32(v));
  return getBody(v) as i32;
}

export function asU32(v: Val): u32 {
  assert(isU32(v));
  return getBody(v) as u32;
}

function fromTagBody(t: tag, body: u64): Val {
  assert(body < (1 << 60));
  assert(t < 8);
  return (body << 4) | ((t << 1) as u64) | 1;
}

export function asU63Val(i: u64): Val {
  assert((i >> 63) == 0);
  const v = (i << 1) as Val;
  return v;
}

export function asI32Val(i: i32): Val {
  return fromTagBody(tagI32, i as u32 as u64);
}

export function asU32Val(i: u32): Val {
  return fromTagBody(tagU32, i as u64);
}
