#!/usr/bin/env bun
import { readStdin, println } from "../helpers";
import { createCanvas } from "canvas";
import { resolve } from "path";

const nodes = (await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(",").map(Number) as [number, number]);

const borders = nodes.reduce<[number, number][]>((acc, self, index, array) => {
  const next = array[index + 1] ?? array[0];
  if (self[0] === next[0]) {
    for (
      let x = Math.min(self[1], next[1]);
      x < Math.max(self[1], next[1]);
      x++
    ) {
      acc.push([self[0], x]);
    }
  } else {
    for (
      let x = Math.min(self[0], next[0]);
      x < Math.max(self[0], next[0]);
      x++
    ) {
      acc.push([x, self[1]]);
    }
  }
  return acc;
}, []);

nodes
  .combinations(2)
  .map(([a, b]) => ({
    a,
    b,
    size: Math.abs((1 + a[0] - b[0]) * (1 + a[1] - b[1])),
  }))
  .sortBy((v) => -v.size)
  .slice(0, 5)
  .tap((v) => println(v));

// .tap((v) => println(v.length));

// .combinations(2)
// .map(([a, b]) => Math.abs((1 + a[0] - b[0]) * (1 + a[1] - b[1])))
// .max()

// // so, we only need to actually check the edges of our rectangle rather than the inside? Maybe we should draw a picture to be sure

// // We could introduce a `.covers` to the Set? subset would be teh right term, so maybe is_subset? is_superset s
// // maybe covers just as without ruby's ? it all gets confusing
// .tap((v) => println(v));
