interface Array<T> {
  then<R>(block: (self: Array<T>) => R): R;
  tap(block: (self: Array<T>) => void): Array<T>;
  transpose(): Array<T> extends Array<Array<infer U>> ? Array<Array<U>> : never;
  sum(): Array<T> extends Array<number> ? number : never;
  min(): Array<T> extends Array<number> ? number : never;
  max(): Array<T> extends Array<number> ? number : never;
  eachCons(n: number): Array<Array<T>>;
  sortBy(block: (row: T) => number | string): Array<T>;
}

interface Number {
  times: (block: (self: Number) => void) => void;
}
