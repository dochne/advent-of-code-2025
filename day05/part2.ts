#!/usr/bin/env bun
import { readStdin, println, Range } from "../helpers";

let [fresh, _ingredients] = (
  (await readStdin()).trim().split("\n\n") as [string, string]
).then(([fresh, ingredients]) => {
  return [
    fresh
      .split("\n")
      .map((v) => v.split("-").map(Number) as [number, number])
      .map(([from, to]) => ({ from, to }))
      .sortBy((v) => v.from),
    ingredients.split("\n").map(Number),
  ];
});

const result = fresh.reduce((acc, current) => {
  const last = acc.last();

  if (last && current.from <= last.to) {
    last.to = Math.max(current.to, last.to);
    return acc;
  }

  return [...acc, current];
}, [] as { from: number; to: number }[]);

println(result.map((v) => v.to - v.from + 1).sum());
