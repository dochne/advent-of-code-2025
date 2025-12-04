{
  const methods = {
    then: function <T, R>(this: string, block: (self: string) => R): R {
      return block(this);
    },
    insert: function <T, R>(
      this: string,
      pos: number,
      char: (self: string | number) => R
    ): string {
      // Todo: error handle
      let before = this.slice(0, pos);
      let after = this.slice(pos + 1);
      return before + String(char) + after;
    },
    remove: function (this: string, pos: number): string {
      let before = this.slice(0, pos);
      let after = this.slice(pos + 1);
      return before + after;
    },
  };

  for (const [key, method] of Object.entries(methods)) {
    Object.defineProperty(String.prototype, key, {
      value: method,
      writable: false,
      enumerable: false,
      configurable: true,
    });
  }
}
