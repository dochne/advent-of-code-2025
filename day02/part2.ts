#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const ranges = (await readStdin())
  .trim()
  .split(",")
  .map((v) => v.split("-") as [string, string])
  .reduce((acc, [origFrom, origTo]) => {
    const invalid = new Set();
    // mod all the things
    for (let mod = 2; mod <= 10; mod++) {
      let from =
        origFrom.length % mod === 1 ? String(10 ** origFrom.length) : origFrom;
      let to =
        origTo.length % mod === 1
          ? String(10 ** (origTo.length - 1) - 1)
          : origTo;

      if (Number(from) > Number(to)) {
        continue;
      }

      let start = Number(from.slice(0, from.length / mod));
      let end = Number(to.slice(0, to.length / mod));

      for (let x = start; x <= end; x++) {
        let n = Number(String(x).repeat(mod));
        if (Number(from) <= n && n <= Number(to)) {
          invalid.add(n);
        }
      }
    }
    return acc + ([...invalid] as number[]).sum();
  }, 0);

println(ranges);
