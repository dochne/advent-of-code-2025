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
    sum: function (this: Array<number>): number {
      return this.reduce((prev, cur) => prev + cur, 0);
    },
    min: function (this: Array<number>): number {
      return Math.min(...this);
    },
    max: function (this: Array<number>): number {
      return Math.max(...this);
    },
    product: function <T>(this: Array<T>, ...arrays: T[][]): T[][] {
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
