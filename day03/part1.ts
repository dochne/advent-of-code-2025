#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const value = (await readStdin())
  .trim()
  .split("\n")
  .map((v) =>
    v
      .split("")
      .map((v) => Number(v))
      .reduce(
        (acc, cur) => String([acc, acc[0] + cur, (acc[1] ?? "0") + cur].max()),
        "00"
      )
  )
  .map((v) => Number(v))
  .sum();

println(value);
