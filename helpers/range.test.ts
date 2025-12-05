import { expect, test } from "bun:test";
import { Range } from "./range";

test("range intersects", () => {
  const tests = [
    // {
    //   input: [
    //     [5, 10],
    //     [12, 50],
    //   ],
    //   output: [
    //     [5, 10],
    //     [12, 50],
    //   ],
    // },
    {
      input: [
        [1, 5],
        [4, 10],
      ],
      output: [[1, 10]],
    },
    {
      input: [
        [4, 10],
        [1, 5],
      ],
      output: [[1, 10]],
    },
    {
      input: [
        [1, 20],
        [5, 15],
      ],
      output: [[1, 20]],
    },
    {
      input: [
        [5, 15],
        [1, 20],
      ],
      output: [[1, 20]],
    },
  ];

  for (const { input, output } of tests) {
    const ranges = input.map((v) => new Range(v[0], v[1]));
    expect(ranges[0].merge(ranges[1]).map((r) => r.toArray())).toEqual(output);
  }
  // expect(new Range(5, 10), e)
  expect(2 + 2).toBe(4);
});
