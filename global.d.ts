interface Array<T> {
  eachCons(n: number): Array<Array<T>>;
  eachWithObject<A>(
    initial: A,
    block: (acc: A, currentValue: T, currentIndex: number, array: T[]) => void
  ): A;
  filterMap<R>(block: (self: T) => R): Array<NonNullable<R>>;
  first(): T | undefined;
  groupBy(block: (row: T) => number | string): Record<string, T[]>;
  intersect<U>(this: Array<T>, items: Set<T> | Map<T, U> | Array<T>): T[];
  intersect<T extends string | number | symbol, U = never>(
    this: Array<T>,
    items: Record<T, U>
  ): T[];
  last(): T | undefined;
  max(): Array<T> extends Array<number> ? number : never;
  min(): Array<T> extends Array<number> ? number : never;
  product(): Array<T> extends Array<number> ? number : never;
  product(...arrays: T[][]): Array<T>[];
  sortBy(block: (row: T) => number | string): Array<T>;
  sum(): Array<T> extends Array<number> ? number : never;
  sum(
    block: (self: T) => number
  ): Array<T> extends Array<number> ? number : never;
  tap(block: (self: Array<T>) => void): Array<T>;
  then<R>(block: (self: Array<T>) => R): R;
  transpose(): Array<T> extends Array<Array<infer U>> ? Array<Array<U>> : never;
  union(self: Array<T>, ...array: Array<T>[]): Array<T>;
  unique(): Array<T>;
  unique<R>(block: (value: T) => R): Array<T>;
  zip<U>(that: Array<U>): Array<[T, U]>;
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
  merge: (...sets: Set<T>[]) => Set<T>;
  addMany: (...items: T[]) => Set<T>;
}

interface Object {
  tap<T>(this: T, block: (self: T) => void): T;
  // We can't call it then or bun breaks :(
  chain<T, R>(this: T, block: (self: T) => R): R;
}
