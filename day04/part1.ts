#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const rolls = (await readStdin())
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

const total = [...rolls].filter((v) => {
  const [x, y] = v.split(",").map((v) => Number(v));
  const nextTo = (3)
    .times((a) => (3).times((b) => `${x + (-1 + a)},${y + (-1 + b)}`))
    .flat();
  return nextTo.filter((v) => rolls.has(v)).length < 5;
}).length;

println(total);
// console.log(value);
