import { Val } from "./val.ts";

@external("env", "log_value")
export declare function log_value(v: Val): Val;
@external("env", "rand")
export declare function rand(): Val;
@external("env", "store")
export declare function store(k: Val, v: Val): void;
@external("env", "load")
export declare function load(k: Val): Val;
@external("env", "pay")
export declare function pay(src: Val, dst: Val, asset: Val, amount: Val): Val;

@external("env", "vec_new")
export declare function vec_new(): Val;
@external("env", "vec_put")
export declare function vec_put(v: Val, i: Val, x: Val): Val;
@external("env", "vec_get")
export declare function vec_get(v: Val, i: Val): Val;
@external("env", "vec_del")
export declare function vec_del(v: Val, i: Val): Val;
@external("env", "vec_len")
export declare function vec_len(v: Val): Val;
@external("env", "vec_push")
export declare function vec_push(v: Val, x: Val): Val;
@external("env", "vec_pop")
export declare function vec_pop(v: Val): Val;
@external("env", "vec_take")
export declare function vec_take(v: Val, n: Val): Val;
@external("env", "vec_drop")
export declare function vec_drop(v: Val, n: Val): Val;
@external("env", "vec_front")
export declare function vec_front(v: Val): Val;
@external("env", "vec_back")
export declare function vec_back(v: Val): Val;
@external("env", "vec_insert")
export declare function vec_insert(v: Val, i: Val, x: Val): Val;
@external("env", "vec_append")
export declare function vec_append(v1: Val, v2: Val): Val;
