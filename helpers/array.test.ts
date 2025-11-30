import { describe, it, expect, beforeAll, mock } from "bun:test";
import "./";

// Yup, I did get AI to write my tests for me - I don't think it's unreasonable :D
describe("Array Prototype Extensions", () => {
  // Test 'then' method
  describe(".then()", () => {
    it("should pass the array to the block and return the block's result", () => {
      const arr = [10, 20, 30];
      const result = arr.then((a) => a.reduce((sum, val) => sum + val, 0));
      expect(result).toBe(60);
    });

    it("should allow chaining of operations within the block", () => {
      const arr = [1, 2];
      const result = arr.then((a) => a.map((x) => x * 2)); // Result is [2, 4]
      expect(result).toEqual([2, 4]);
    });
  });

  // Test 'tap' method
  describe(".tap()", () => {
    it("should execute the block and return the original array", () => {
      const originalArr = [1, 2];
      const spy = mock(); // Updated from vi.fn() to mock() for Bun:test

      // Tap mutates the original array
      const returnedArr = originalArr.tap((a) => {
        spy(a);
        a.push(3);
      });

      // 1. Should return the exact same array instance (for chaining)
      expect(returnedArr).toBe(originalArr);
      // 2. Should execute the block
      expect(spy).toHaveBeenCalledWith(originalArr);
      // 3. Should reflect any mutation made inside the block
      expect(originalArr).toEqual([1, 2, 3]);
    });
  });

  // Test 'transpose' method
  describe(".transpose()", () => {
    it("should correctly transpose a square matrix", () => {
      const matrix = [
        [1, 2],
        [3, 4],
      ];
      const expected = [
        [1, 3],
        [2, 4],
      ];
      expect(matrix.transpose()).toEqual(expected);
    });

    it("should correctly transpose a non-square matrix", () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      const expected = [
        [1, 4],
        [2, 5],
        [3, 6],
      ];
      expect(matrix.transpose()).toEqual(expected);
    });

    it("should return an empty array for an empty matrix", () => {
      expect([].transpose()).toEqual([]);
    });

    it("should handle nested arrays with different types", () => {
      const matrix = [
        ["a", 1],
        ["b", 2],
      ];
      const expected = [
        ["a", "b"],
        [1, 2],
      ];
      expect(matrix.transpose()).toEqual(expected);
    });
  });

  // Test numeric methods: 'sum', 'min', 'max'
  describe("Numeric Methods (sum, min, max)", () => {
    const data = [10, 5, 8, 2, 15];
    const negativeData = [-10, -5, -8, -2, -15];
    const mixedData = [-5, 10, 0, 1];

    it(".sum() should correctly calculate the sum of positive numbers", () => {
      expect(data.sum()).toBe(40); // 10 + 5 + 8 + 2 + 15 = 40
    });

    it(".sum() should correctly calculate the sum of negative numbers", () => {
      expect(negativeData.sum()).toBe(-40);
    });

    it(".sum() should return 0 for an empty array", () => {
      expect([].sum()).toBe(0);
    });

    it(".min() should find the minimum positive number", () => {
      expect(data.min()).toBe(2);
    });

    it(".min() should find the minimum negative number", () => {
      expect(negativeData.min()).toBe(-15);
    });

    it(".max() should find the maximum positive number", () => {
      expect(data.max()).toBe(15);
    });

    it(".max() should find the maximum negative number", () => {
      expect(negativeData.max()).toBe(-2);
    });

    it(".min() and .max() should work with mixed data", () => {
      expect(mixedData.min()).toBe(-5);
      expect(mixedData.max()).toBe(10);
    });
  });

  // Test 'eachCons' method
  describe(".eachCons()", () => {
    const data = [1, 2, 3, 4, 5, 6];

    it("should create consecutive groups of size 3", () => {
      const expected = [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6],
      ];
      expect(data.eachCons(3)).toEqual(expected);
    });

    it("should create consecutive groups of size 2", () => {
      const expected = [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
      ];
      expect(data.eachCons(2)).toEqual(expected);
    });

    it("should return an empty array if n is greater than array length", () => {
      expect(data.eachCons(7)).toEqual([]);
    });
  });

  // Test 'sortBy' method
  describe(".sortBy()", () => {
    const people = [
      { name: "Charlie", age: 30 },
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
      { name: "David", age: 25 },
    ];

    it("should sort the array in place by a numeric property (age)", () => {
      // Create a fresh copy since sortBy mutates the array
      const arr = [...people];

      arr.sortBy((p) => p.age);

      const expectedOrder = [
        { name: "Alice", age: 25 },
        { name: "David", age: 25 },
        { name: "Charlie", age: 30 },
        { name: "Bob", age: 30 },
      ];

      // Since the sort is stable for equal ages in JS, we verify the age order
      expect(arr.map((p) => p.age)).toEqual([25, 25, 30, 30]);
    });

    it("should sort the array in place by a string property (name)", () => {
      const arr = [...people];

      arr.sortBy((p) => p.name);

      const expectedNames = ["Alice", "Bob", "Charlie", "David"];

      expect(arr.map((p) => p.name)).toEqual(expectedNames);
    });

    it("should handle an empty array without error", () => {
      const emptyArr: { name: string; age: number }[] = [];
      // Should not throw
      expect(() => emptyArr.sortBy((p) => p.age)).not.toThrow();
      expect(emptyArr).toEqual([]);
    });
  });
});
