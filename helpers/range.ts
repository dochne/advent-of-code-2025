export class Range {
  from: number;
  to: number;

  constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
  }

  includes(n: number) {
    return this.from <= n && n <= this.to;
  }

  length() {
    return this.to - this.from;
  }

  merge(range: Range) {
    // [ 392439165379516, 395850414302244 ]
    // [ 395366451082717, 397702385578543 ]

    if ([this.from, range.from].includes(392439165379516)) {
      if ([this.from, range.from].includes(395366451082717)) {
        console.log("Hellooo");
      }
    }

    // console.log(range.from);
    if (this.from < range.from && range.to < this.to) {
      return this;
      //   return [this];
    }

    if (range.from < this.from && this.to < range.to) {
      this.from = range.from;
      this.to = range.to;
      return this;
      //   return [range];
    }

    // console.log(range.from, this.from);
    // console.log(range.from < this.from, this.from < range.to);
    if (range.from <= this.from && this.from <= range.to) {
      this.from = range.from;
      this.to = Math.max(this.to, range.to);
      //   return [this];
      return this;
    }

    // console.log(range.from, this.from);
    // console.log(range.from < this.to, range.from < this.from);

    // let's take this: 1-5, to: 4-6
    // we want to check that range.from is under .to
    // we also want to check that this.to is
    if (range.from <= this.to && this.from <= range.from) {
      this.from = Math.min(this.from, range.from);
      this.to = range.to;
      return this;
      //   return [this];
    }

    return undefined;
    // return [this, range];
  }

  toArray() {
    return [this.from, this.to];
  }

  //   toString() {
  //     return "Range";
  //   }
}
