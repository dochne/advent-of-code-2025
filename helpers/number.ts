const methods = {
  times: function <T, R>(this: number, block: (self: number) => R): void {
    for (let x = 0; x <= this; x++) {
      block(x);
    }
  },
};

for (const [key, method] of Object.entries(methods)) {
  Object.defineProperty(Number.prototype, key, {
    value: method,
    writable: false,
    enumerable: false,
    configurable: true,
  });
}
