let totalCalled = 0;
{
  const methods = {
    chain: function <R>(this: Object, block: (self: Object) => R): R {
      return block(this);
    },
    tap: function (this: Object, block: (self: Object) => void): Object {
      block(this);
      return this;
    },
  };

  for (const [key, method] of Object.entries(methods)) {
    Object.defineProperty(Object.prototype, key, {
      value: method,
      writable: false,
      enumerable: false,
      configurable: true,
    });
  }
}
