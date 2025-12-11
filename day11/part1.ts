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

function recurse(current: string, visited: Set<string>): number {
  if (current === "you") return 1;
  if (visited.has(current)) return 0;
  visited.add(current);
  let value = (graph.map[current] ?? []).sum((route) => {
    return recurse(route, visited);
  });
  visited.delete(current);
  return value;
}

println(recurse("out", new Set(["svi", "dpv"])));
