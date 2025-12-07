#!/usr/bin/env bun
import { readStdin, println, createMemo } from "../helpers";

const memo = createMemo<number>();

const value = (await readStdin())
  .trim()
  .split("\n")
  .then((lines) => ({
    pos: lines.shift()!.indexOf("S"),
    lines: lines.map((line) =>
      line
        .split("")
        .map((c, i) => (c === "^" ? i : null))
        .filter(Boolean)
    ),
  }))
  .chain(({ pos, lines }) => {
    const seek = (pos: number, y: number): number => {
      return memo(`${pos}x${y}`, () => {
        if (lines[y] === undefined) return 1;
        return lines[y].includes(pos)
          ? [seek(pos + 1, y + 1), seek(pos - 1, y + 1)].sum()
          : seek(pos, y + 1);
      });
    };
    return seek(pos, 0);
  });

println(value);
