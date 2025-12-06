interface Array<T> {
  first(): T | undefined;
  last(): T | undefined;
  then<R>(block: (self: Array<T>) => R): R;
  tap(block: (self: Array<T>) => void): Array<T>;
  filterMap<R>(block: (self: T) => R): Array<NonNullable<R>>;
  transpose(): Array<T> extends Array<Array<infer U>> ? Array<Array<U>> : never;
  sum(): Array<T> extends Array<number> ? number : never;
  sum(
    block: (self: T) => number
  ): Array<T> extends Array<number> ? number : never;
  min(): Array<T> extends Array<number> ? number : never;
  max(): Array<T> extends Array<number> ? number : never;
  eachCons(n: number): Array<Array<T>>;
  sortBy(block: (row: T) => number | string): Array<T>;
  product(): Array<T> extends Array<number> ? number : never;
  product(...arrays: T[][]): Array<T>[];
  groupBy(block: (row: T) => number | string): Record<string, T[]>;
  eachWithObject<A>(initial: A, block: (acc: A, row: T) => void): A;
}

interface Number {
  times: <R>(block: (self: number) => R) => Array<R>;
  then<R>(block: (self: number) => R): R;
}

interface String {
  insert: (pos: number, char: string | number) => string;
  remove: (pos: number) => string;
  then<R>(block: (self: string) => R): R;
}

interface Set<T> {
  filter: (block: (self: T) => boolean) => Set<T>;
}
