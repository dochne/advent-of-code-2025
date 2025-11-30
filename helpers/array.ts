const methods = {
  then: function <T, R>(this: Array<T>, block: (self: Array<T>) => R): R {
    return block(this);
  },
  tap: function <T>(this: Array<T>, block: (self: Array<T>) => void): Array<T> {
    block(this);
    return this;
  },
  transpose: function <T>(this: Array<Array<T>>): Array<Array<T>> {
    if (this.length === 0) return [];
    return this[0].map((_, colIndex) => this.map((row) => row[colIndex]));
  },
  sum: function (this: Array<number>): Number {
    return this.reduce((prev, cur) => prev + cur, 0);
  },
  min: function (this: Array<number>): Number {
    return Math.min(...this);
  },
  max: function (this: Array<number>): Number {
    return Math.max(...this);
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
