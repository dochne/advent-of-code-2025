#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const ranges = (await readStdin())
  .trim()
  .split(",")
  .map((v) => v.split("-") as [string, string])
  .map(([from, to]) => [
    from.length % 2 === 1 ? String(10 ** from.length) : from,
    to.length % 2 === 1 ? String(10 ** (to.length - 1) - 1) : to,
  ])
  .filter(([from, to]) => Number(from) <= Number(to))
  .reduce((acc, [from, to]) => {
    let start = Number(from.slice(0, from.length / 2));
    let end = Number(to.slice(0, to.length / 2));
    for (let x = start; x <= end; x++) {
      let n = Number(x + "" + x);
      if (Number(from) <= n && n <= Number(to)) {
        acc += n;
      }
    }
    return acc;
  }, 0);

println(ranges);
