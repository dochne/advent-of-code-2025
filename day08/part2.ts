#!/usr/bin/env bun
import { readStdin, println, isExample } from "../helpers";

const nodes = (await readStdin()).trim().split("\n");

nodes
  .product(nodes)
  .map((pair) => pair.sortBy((v) => v))
  .unique((v) => JSON.stringify(v))
  .filter(([a, b]) => JSON.stringify(a) !== JSON.stringify(b))
  .map(([a, b]) => ({ a, b, distance: distance(a, b) }))
  .sortBy((v) => v.distance)
  .eachWithObject(
    new Map(nodes.map((v) => [v, new Set([v])])),
    (acc, { a, b }) => {
      const set = acc.get(a)!;
      set.merge(acc.get(b)!);
      if (set.size === nodes.length) {
        println(Number(a.split(",").first()!) * Number(b.split(",").first()!));
        process.exit(0);
      }
      acc.get(b)!.forEach((node) => acc.set(node, set));
    }
  );

function distance(aStr: string, bStr: string) {
  let a = aStr.split(",").map(Number) as [number, number, number];
  let b = bStr.split(",").map(Number) as [number, number, number];
  // This is the formal distance, but we don't need to Math.sqrt - remember that if we want to be faster
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}
