#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const lines = (await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.match(new RegExp(/^\[(.*)](.*){(.*)}/))?.slice(1) as string[])
  .map(([target, buttons, joltage]) => {
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
        )
        .map((button) => {
          const buttonArray = "0"
            .repeat(joltage.split(",").length)
            .split("")
            .map(Number);
          for (const num of button) {
            buttonArray[num] = 1;
          }
          return buttonArray;
        }),
      joltage: joltage.split(",").map(Number),
    };
  });

// println(lines);
function bfs(current: number[], target: number[], buttons: number[][]) {
  let targetStr = target.join(",");
  const queue = [];
  for (const button of buttons) {
    queue.push({ current, button, depth: 1 });
  }

  while (true) {
    console.log(queue.length);
    let item: { current: number[]; button: number[]; depth: number } =
      queue.shift()!;

    const next = item.current.zip(item.button).map((v) => v.sum());
    let valid = true;
    for (let i = 0; i < target.length; i++) {
      if (next[i] > target[i]) {
        continue;
      }
      if (next[i] !== target[i]) {
        valid = false;
      }
    }

    console.log(item.current, item.button, next, target);
    // return;

    if (valid) {
      return item.depth;
    }

    queue.push(
      ...buttons.map((b) => ({
        current: next,
        button: b,
        depth: item.depth + 1,
      }))
    );
  }
}

// println(
lines
  .map(({ buttons, joltage }, index) =>
    bfs("0".repeat(joltage.length).split("").map(Number), joltage, buttons)
  )
  .sum();
// );
