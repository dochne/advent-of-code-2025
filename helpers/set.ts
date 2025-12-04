{
  const methods = {
    filter: function <T, R>(this: Set<T>, block: (self: T) => boolean): Set<T> {
      return new Set([...this].filter((v) => block(v)));
    },
    times: function <T, R>(this: number, block: (self: number) => R): R[] {
      let result = [];
      for (let x = 0; x < this; x++) {
        result.push(block(x));
      }
      return result;
    },
  };

  for (const [key, method] of Object.entries(methods)) {
    Object.defineProperty(Set.prototype, key, {
      value: method,
      writable: false,
      enumerable: false,
      configurable: true,
    });
  }
}
