interface Array<T> {
  then<R>(block: (self: Array<T>) => R): R;
  tap(block: (self: Array<T>) => void): Array<T>;
  transpose(): Array<T> extends Array<Array<infer U>> ? Array<Array<U>> : never;
  sum(): Array<T> extends Array<number> ? number : never;
  min(): Array<T> extends Array<number> ? number : never;
  max(): Array<T> extends Array<number> ? number : never;
  eachCons(n: number): Array<Array<T>>;
  sortBy(block: (row: T) => number | string): Array<T>;
  product(...arrays: T[][]): Array<T>[];
}

// product: function <T>(this: Array<T>, ...arrays: T[][]): T[][] {
//       return [this, ...arrays].reduce(
//         (acc, curr) => {
//           return acc.flatMap((a) => curr.map((c) => [...a, c]));
//         },
//         [[]] as T[][]
//       );
//     },
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
