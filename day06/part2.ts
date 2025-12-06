#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const value = (await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(""))
  .transpose()
  .eachWithObject([] as { op: string; values: number[] }[], (acc, col) => {
    const [op, num] = [col.pop()!, Number(col.join(""))];
    if ("*+".includes(op)) acc.push({ op, values: [] });
    if (num > 0) acc.last()!.values.push(num);
  })
  .sum(({ op, values }) => (op === "+" ? values.sum() : values.product()));

println(value);
