#!/usr/bin/env bun
import { readStdin, print } from "../helpers";

const value = (await readStdin())
  .split("\n")
  .map((v) => v.match(/([LR])(.*)/) as [string, string, string])
  .map((v) => [v[1], Number(v[2])] as [string, number])
  .reduce(
    (acc, [dir, dist]) => {
      acc.total += Math.floor(dist / 100);
      dist = dist % 100;

      if (acc.pos !== 0) {
        if (dir === "L" && acc.pos <= dist) {
          acc.total += 1;
        } else if (dir === "R" && acc.pos + dist >= 100) {
          acc.total += 1;
        }
      }

      return {
        pos: (acc.pos + (dir == "L" ? 100 - dist : dist)) % 100,
        total: acc.total,
      };
    },
    { pos: 50, total: 0 }
  );

print(value);
