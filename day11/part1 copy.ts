#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

const invertedRoutes = (await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(":").map((v) => v.trim()))
  .eachWithObject<Record<string, string[]>>({}, (acc, [key, routes]) =>
    routes.split(" ").eachWithObject(acc, (acc, route) => {
      acc[route] ??= [];
      acc[route].push(key);
    })
  );

// println(Object.keys(invertedRoutes).length);
// println(invertedRoutes);

println(recurse("out", new Set()));

function recurse(current: string, visited: Set<string>): number {
  if (current === "you") return 1;
  if (visited.has(current)) return 0;
  visited.add(current);
  let value = (invertedRoutes[current] ?? []).sum((route) => {
    return recurse(route, visited);
  });
  visited.delete(current);
  return value;
}
//   .map(([key, routes]) => ({ [key]: routes.split(" ") }))

// const invertedMap = {};

// println(value);

// we should make a map then go backwards from out!

// function recurse(current: string, visited: Set<number>) {

//   //   println("Visited ", current);
//   if (visited.has(current) || visited.size > maxDepth) return null;
//   if (current === target) return visited.size;

//   //   println("Got here");
//   visited.add(current);
//   let values = buttons.map((b) => {
//     let value = recurse(current ^ b, target, buttons, visited, maxDepth);
//     if (value !== null) {
//       maxDepth = Math.min(maxDepth, value);
//     }
//     return value;
//   });

//   visited.delete(current);

//   if (values.filter(Boolean).length > 0) {
//     // console.log("Am returning min", values.filter(Boolean).min());
//     return values.filter(Boolean).min();
//   }

//   return null;
// }
