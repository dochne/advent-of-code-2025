#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

(await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(",").map(Number) as [number, number])
  .combinations(2)
  .map(([a, b]) => Math.abs((1 + a[0] - b[0]) * (1 + a[1] - b[1])))
  .max()
  .tap((v) => println(v));
