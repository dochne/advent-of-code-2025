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
    transpose: function <T>(this: Array<Array<T>>): Array<Array<T>> {
      if (this.length === 0) return [];
      return this[0].map((_, colIndex) => this.map((row) => row[colIndex]));
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
      this.sort((aRow, bRow) => {
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
