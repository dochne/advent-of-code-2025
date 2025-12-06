#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const value = (await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(""))
  .transpose()
  .reduce((acc, col) => {
    if (["*", "+"].includes(col.last()!)) {
      acc.push({ op: col.last()! as "+" | "*", values: [] });
    }
    acc.last()!.values.push(Number(col.slice(0, col.length - 1).join("")));
    return acc;
  }, [] as { op: "+" | "*" | undefined; values: number[] }[])
  .reduce(
    (acc, v) =>
      acc +
      (v.op === "+"
        ? v.values.sum()
        : v.values.filter((v) => v !== 0).reduce((acc, n) => acc * n)),
    0
  );

println(value);
