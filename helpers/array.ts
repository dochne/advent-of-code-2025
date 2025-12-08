{
  const methods = {
    then: function <T, R>(this: Array<T>, block: (self: Array<T>) => R): R {
      return block(this);
    },
    tap: function <T>(
      this: Array<T>,
      block: (self: Array<T>) => void
    ): Array<T> {
      block(this);
      return this;
    },
    first: function <T>(this: Array<T>): T | undefined {
      return this[0] ?? undefined;
    },
    last: function <T>(this: Array<T>): T | undefined {
      return this[this.length - 1] ?? undefined;
    },
    transpose: function <T>(this: Array<Array<T>>): Array<Array<T>> {
      if (this.length === 0) return [];
      return this[0].map((_, colIndex) => this.map((row) => row[colIndex]));
    },
    filterMap: function <T, R>(
      this: Array<T>,
      block: (self: T) => R | undefined
    ): Array<R> {
      return this.reduce((acc, val) => {
        const value = block(val);
        if (value !== undefined) {
          acc.push(value);
        }
        return acc;
      }, [] as Array<R>);
    },
    sum: function <T>(
      this: Array<T | number>,
      block: ((self: T) => number) | undefined
    ): number {
      if (block !== undefined) {
        return (this as Array<T>).reduce((prev, cur) => prev + block(cur), 0);
      }
      return (this as Array<number>).reduce((prev, cur) => prev + cur, 0);
    },
    min: function (this: Array<number>): number {
      return Math.min(...this);
    },
    max: function (this: Array<number>): number {
      return Math.max(...this);
    },
    product: function <T>(this: Array<T>, ...arrays: T[][]): T[][] | number {
      if (arrays.length === 0) {
        return (this as Array<number>).reduce((acc, curr) => curr * acc);
      }
      return [this, ...arrays].reduce(
        (acc, curr) => {
          return acc.flatMap((a) => curr.map((c) => [...a, c]));
        },
        [[]] as T[][]
      );
    },
    eachCons: function <T>(this: Array<T>, n: number): Array<Array<T>> {
      const endIndex = this.length - n;

      if (n <= 0) {
        throw new Error(`${n} must be greater than 0`);
      }

      if (endIndex <= 0) {
        return [];
      }

      let result = [];
      for (let i = 0; i <= endIndex; i++) {
        result.push(this.slice(i, i + n));
      }
      return result;
    },
    sortBy: function <T>(this: Array<T>, block: (self: T) => string | number) {
      return this.sort((aRow, bRow) => {
        const a = block(aRow);
        const b = block(bRow);
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      });
    },
    groupBy: function <T>(this: Array<T>, block: (self: T) => string | number) {
      const obj: Record<string | number, T[]> = {};
      for (const item of this) {
        const key = block(item);
        obj[key] ??= [];
        obj[key].push(item);
      }
      return obj;
    },
    eachWithObject: function <T, A>(
      this: Array<T>,
      initial: A,
      block: (acc: A, currentValue: T, currentIndex: number, array: T[]) => void
    ): A {
      return this.reduce((acc, cur, index, array) => {
        block(acc, cur, index, array);
        return acc;
      }, initial);
    },
    intersect: function <U, T>(
      this: Array<T>,
      items: Set<T> | Map<T, U> | Array<T> | Record<string | symbol | number, U>
    ): Array<T> {
      if (items instanceof Set || items instanceof Map) {
        return this.filter((v) => items.has(v));
      } else if (items instanceof Array) {
        return this.filter((v) => items.includes(v));
      } else if (items instanceof Object) {
        const keys = Object.keys(items);
        return this.filter((v) => keys.includes(String(v)));
      }
      throw new Error("unreachable");
    },
    union: function <T>(self: Array<T>, ...arrays: Array<T>[]): Array<T> {
      return [...new Set(self.concat(...arrays))];
    },
    unique: function <T, R>(this: Array<T>, block: (value: T) => R): Array<T> {
      if (block) {
        let map = new Map();
        for (let x = 0; x < this.length; x++) {
          map.set(block(this[x]), this[x]);
        }
        return [...map.values()];
      }
      return [...new Set(this)];
    },
  };

  for (const [key, method] of Object.entries(methods)) {
    Object.defineProperty(Array.prototype, key, {
      value: method,
      writable: false,
      enumerable: false,
      configurable: true,
    });
  }
}
