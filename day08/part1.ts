#!/usr/bin/env bun
import { readStdin, println, isExample } from "../helpers";

const nodes = (await readStdin()).trim().split("\n");

const circuits = nodes.eachWithObject(
  new Map<string, Set<string>>(),
  (map, node) => map.set(node, new Set([node]))
);

nodes
  .product(nodes)
  .map((pair) => pair.sortBy((v) => v))
  .unique((v) => JSON.stringify(v))
  .filter(([a, b]) => JSON.stringify(a) !== JSON.stringify(b))
  .map(([a, b]) => ({ a, b, distance: distance(a, b) }))
  .sortBy((v) => v.distance)
  .slice(0, isExample() ? 10 : 1000)
  .tap((v) => println(v))
  .forEach(({ a, b }) => {
    circuits.get(a)!.merge(circuits.get(b)!);
    circuits.get(b)!.forEach((node) => circuits.set(node, circuits.get(a)!));
  });

println(
  [...circuits.values()]
    .unique()
    .map((v) => v.size)
    .sortBy((v) => -v)
    .slice(0, 3)
    .product()
);

function distance(aStr: string, bStr: string) {
  let a = aStr.split(",").map(Number) as [number, number, number];
  let b = bStr.split(",").map(Number) as [number, number, number];
  // This is the formal distance, but we don't need to Math.sqrt - remember that if we want to be faster
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}
