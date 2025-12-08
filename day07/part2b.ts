#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const value = (await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(""))
  .chain((lines) => ({
    beams: lines.shift()!.map((v) => (v === "S" ? 1 : 0)),
    lines: lines.map((line) =>
      line.eachWithObject<number[]>([], (a, c, i) => c === "^" && a.push(i))
    ),
  }))
  .chain(({ beams, lines }) =>
    lines.eachWithObject(beams, (beams, line) => {
      line
        .intersect(
          beams.eachWithObject<number[]>([], (a, v, i) => v > 0 && a.push(i))
        )
        .eachWithObject(beams, (beams, x) => {
          beams[x - 1] += beams[x];
          beams[x + 1] += beams[x];
          beams[x] = 0;
        });
    })
  )
  .sum();

println(value);
