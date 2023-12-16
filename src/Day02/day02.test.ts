import { textReaderArr } from "../utils/textReader";
import { solve1Star, solve2Star } from "./day02";

const testInput = textReaderArr(2, "test");
const input = textReaderArr(2, "input");

describe("Day 1", () => {
  it("should pass test", () => {
    expect(solve1Star(testInput)).toBe(8);
  });

  it("should solve star 1", () => {
    expect(solve1Star(input)).toBe(2541);
  });

  it("should pass test star 2", () => {
    expect(solve2Star(testInput)).toBe(2286);
  });

  it("should solve star 2", () => {
    expect(solve2Star(input)).toBe(66016);
  });
});
