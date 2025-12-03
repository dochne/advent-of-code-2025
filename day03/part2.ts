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
        (acc, cur) =>
          String(
            [acc, ...(12).times((x) => acc.remove(x) + cur)].max()
          ).padStart(12, "0"),
        "0"
      )
  )
  .map((v) => Number(v))
  .sum();

println(value);
