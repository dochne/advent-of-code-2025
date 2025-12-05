#!/usr/bin/env bun
import { readStdin, println, Range } from "../helpers";

const [fresh, ingredients] = (
  (await readStdin()).trim().split("\n\n") as [string, string]
).then(([fresh, ingredients]) => {
  return [
    fresh
      .split("\n")
      .map((v) => v.split("-").map(Number) as [number, number])
      .map((v) => new Range(...v)),
    ingredients.split("\n").map(Number),
  ];
});

println(ingredients.filter((v) => fresh.some((r) => r.includes(v))).length);
