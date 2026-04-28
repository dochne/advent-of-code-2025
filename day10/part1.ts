#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const lines = (await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.match(new RegExp(/^\[(.*)](.*){(.*)}/))?.slice(1) as string[])
  .map(([target, buttons, joltage]) => {
    // IMPORTANT - this isn't binary, we don't get rollover - we just get XOR
    return {
      target: parseInt(target.replaceAll(".", "0").replaceAll("#", "1"), 2),
      buttons: buttons
        .trim()
        .split(" ")
        .map((v) =>
          v
            .slice(1, v.length - 1)
            .split(",")
            .map(Number)
            .reduce((acc, n) => {
              acc[n] = "1";
              return acc;
            }, "0".repeat(target.length).split(""))
            .chain((v) => parseInt(v.join(""), 2))
        ),
      joltage,
    };
  });

function bfs(current: number, target: number, buttons: number[]) {
  const queue = [];
  for (const button of buttons) {
    queue.push({ current, button, depth: 1 });
  }

  while (true) {
    let item: { current: number; button: number; depth: number } =
      queue.shift()!;

    if ((item.current ^ item.button) === target) {
      return item.depth;
    }
    queue.push(
      ...buttons.map((b) => ({
        current: item.current ^ item.button,
        button: b,
        depth: item.depth + 1,
      }))
    );
  }
}

println(
  lines.map(({ target, buttons }, index) => bfs(0, target, buttons)).sum()
);
