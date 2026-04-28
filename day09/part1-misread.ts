#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

// let a = [1, 2, 3, 4];
// println(a.combinations(2));

(await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(",").map(Number) as [number, number])
  .chain((nodes) => {
    const maps = nodes.eachWithObject<{
      x: Record<number, number[]>;
      y: Record<number, number[]>;
    }>({ x: {}, y: {} }, (acc, [x, y]) => {
      (acc.x[x] ??= []).push(y);
      (acc.y[y] ??= []).push(x);
    });

    for (const node of nodes) {
      let [x, y] = node;
      console.log("node", node);
      console.log(maps.x[x], maps.y[y]);
    }
    // nodes.reduce(v => )
    return {};
  })
  .tap((v) => println(v));
//   .eachWithObject({ x: {}, y: {} }, (acc, ([x, y])) => {
//     (acc.x[x] ??= []).push(y);
//   });

//   Record<number, number[]

// can we think of this like sudoku somehow?

// console.log(points);
//   .reduce((v) => {

//   });
//   .combinations(4)
//   .chain((points) => points.product(points, points, points))
//   .tap((v) => println(v.length));

// println(points);
