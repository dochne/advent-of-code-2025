#!/usr/bin/env bun
import { readStdin, print } from "../helpers";

const data = (await readStdin()).split("\n");
const widths = data
  .last()!
  .split("")
  .reduce((acc, cur, i) => (cur !== " " ? [...acc, i] : acc), [
    data.last()!.length,
  ] as number[])
  .sortBy((v) => v);

const result = data
  .map((row) => {
    return widths
      .eachCons(2)
      .reduce(
        (acc, [from, to]) => [...acc, row.slice(from, to)],
        [] as string[]
      );
  })
  .transpose();

//
console.log(result);

//   .map((v) => v.split(/\s+/))
//   .transpose()
//   .map(
//     (v) =>
//       [v.slice(0, v.length - 1).map(Number), v.last()] as [number[], "*" | "+"]
//   )
//   .map(([n, op]) => (op == "*" ? n.reduce((acc, n) => acc * n) : n.sum()))
//   .sum();

// console.log(value);
