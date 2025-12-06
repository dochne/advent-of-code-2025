#!/usr/bin/env bun
import { readStdin, print } from "../helpers";

const value = (await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(/\s+/))
  .transpose()
  .map(
    (v) =>
      [v.slice(0, v.length - 1).map(Number), v.last()] as [number[], "*" | "+"]
  )
  .map(([n, op]) => (op == "*" ? n.reduce((acc, n) => acc * n) : n.sum()))
  .sum();

console.log(value);
