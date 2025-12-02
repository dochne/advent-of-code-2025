#!/usr/bin/env bun
import { readStdin, print } from "../helpers";

const value = (await readStdin())
  .split("\n")
  .map((v) => v.match(/([LR])(.*)/))
  .filter((v) => v !== null) // for ts
  .map((v) => [v[1], Number(v[2])] as [string, number])
  .reduce(
    (acc, curr) => {
      acc.pos = (acc.pos + (curr[0] == "L" ? 100 - curr[1] : curr[1])) % 100;
      if (acc.pos === 0) {
        acc.total += 1;
      }
      return acc;
    },
    { pos: 50, total: 0 }
  );

print(value);
