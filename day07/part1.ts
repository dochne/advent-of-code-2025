#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const value = (await readStdin())
  .trim()
  .split("\n")
  .then((v) => {
    const [state, lines] = [
      { split: 0, beams: new Set([v.shift()!.indexOf("S")]) },
      v,
    ];

    return lines.reduce((acc, cur) => {
      return [...acc.beams].reduce(
        ({ split, beams }, beam) =>
          cur[beam] === "^"
            ? {
                split: split + 1,
                beams: beams.addMany(beam - 1, beam + 1),
              }
            : {
                split,
                beams: beams.add(beam),
              },
        { ...acc, beams: new Set<number>() }
      );
    }, state);
  });

println(value);
