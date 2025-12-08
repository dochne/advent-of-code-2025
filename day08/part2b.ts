#!/usr/bin/env bun
import { readStdin, println, createMemo } from "../helpers";

const memoize = createMemo();

(await readStdin())
  .trim()
  .split("\n")
  .chain((nodes) => ({
    nodes,
    edges: (nodes.product(nodes) as [string, string][]).sortBy(([a, b]) =>
      memoize(`${a}-${b}`, () =>
        a
          .split(",")
          .map(Number)
          .zip(b.split(",").map(Number))
          .sum(([a, b]) => (a - b) ** 2)
      )
    ),
  }))
  .chain(({ nodes, edges }) => {
    edges.eachWithObject(
      new Map(nodes.map((v) => [v, new Set([v])])),
      (acc, [a, b]) => {
        const set = acc.get(a)!.merge(acc.get(b)!);
        if (set.size === nodes.length) {
          println(
            Number(a.split(",").first()!) * Number(b.split(",").first()!)
          );
          process.exit(0);
        }
        acc.get(b)!.forEach((node) => acc.set(node, set));
      }
    );
  });
