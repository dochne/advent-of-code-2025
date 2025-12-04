#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

let rolls = (await readStdin())
  .trim()
  .split("\n")
  .reduce((acc, row, ri) => {
    return row
      .split("")
      .reduce(
        (acc, value, ci) => (value === "@" ? acc.add(`${ri},${ci}`) : acc),
        acc
      );
  }, new Set<string>());

let originalLength = rolls.size;
let lastLength;

while (lastLength !== rolls.size) {
  lastLength = rolls.size;
  rolls = rolls.filter((v) =>
    v
      .split(",")
      .map(Number)
      .then(
        ([x, y]) =>
          [-1, 0, 1]
            .product([-1, 0, 1])
            .map(([a, b]) => `${x + a},${y + b}`)
            .flat()
            .filter((v) => rolls.has(v)).length >= 5
      )
  );
}

println(originalLength - lastLength);
