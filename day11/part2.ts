#!/usr/bin/env bun
import { readStdin, println } from "../helpers";

class Graph {
  private edges;
  public map: Record<string, string[]> = {};

  constructor(edges: [string, string][]) {
    this.edges = edges;
    this.buildMap();
  }

  buildMap() {
    this.map = this.edges.reduce<Record<string, string[]>>(
      (acc, [from, to]) => {
        acc[from] ??= [];
        acc[from].push(to);
        return acc;
      },
      {}
    );
  }

  reverse() {
    this.edges = this.edges.map((v) => v.reverse() as [string, string]);
    this.buildMap();
    return this;
  }

  display() {
    let text = ["digraph G {"];
    for (let [from, to] of this.edges) {
      text.push(`${from} -> ${to};`);
    }
    text.push("}");
    return text.join("\n");
  }
}

const graph = (await readStdin())
  .trim()
  .split("\n")
  .map((v) => v.split(":").map((v) => v.trim()))
  .eachWithObject<[string, string][]>([], (acc, [key, routes]) =>
    acc.push(...routes.split(" ").map((v) => [key, v] as [string, string]))
  )
  .chain((v) => new Graph(v))
  .chain((g) => g.reverse());

function recurse(
  current: string,
  target: string,
  visited: Set<string>
): number {
  if (current === target) return 1;
  if (visited.has(current)) return 0;
  visited.add(current);
  let value = (graph.map[current] ?? []).sum((route) => {
    return recurse(route, target, visited);
  });
  visited.delete(current);
  return value;
}

// what about every way to get from out to svi, out to dpv, out to you

let layers = [
  // ["out"],
  ["svi", "dpv", "you"],
  ["dac"],
  ["sxd", "jqy", "krn"],
  ["cok", "cyz", "eqi"],
  ["dyb", "wwr", "jeu"],
  ["fft"],
  ["iip", "mwn", "ekk", "jmp"],
  ["svr"],
];

let heap = [{ key: "out", value: 1 }];

for (let [index, targets] of layers.entries()) {
  heap = targets.map((target) => {
    let total = 0;
    heap.forEach(({ key, value }) => {
      let set = new Set(layers[index]);
      set.addMany(...(layers[index + 1] ?? []));
      total += value * recurse(key, target, set);
    });
    return { key: target, value: total };
  });
}

println(heap);
