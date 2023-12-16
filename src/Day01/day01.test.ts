import { textReaderArr } from "../utils/textReader";
import { solve1Star, solve2Star } from "./day1";

const testInput = textReaderArr(1, "test");
const input = textReaderArr(1, "input");

const testInput2 = textReaderArr(1, "test2");

describe("Day 1", () => {
  it("should pass test", () => {
    expect(solve1Star(testInput)).toBe(142);
  });

  it("should solve star 1", () => {
    expect(solve1Star(input)).toBe(55123);
  });

  it("should pass test star 2", () => {
    expect(solve2Star(testInput2)).toBe(281);
  });

  it("should solve star 2", () => {
    expect(solve2Star(input)).toBe(55260);
  });
});
