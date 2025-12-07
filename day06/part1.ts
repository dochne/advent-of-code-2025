#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const value = (await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(/\s+/))
  .transpose()
  .map((v) => [v.pop(), v.slice(0, -1).map(Number)] as [string, number[]])
  .map(([op, n]) => (op === "*" ? n.product() : n.sum()))
  .sum();

println(value);
