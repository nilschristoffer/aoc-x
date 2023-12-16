import { textReaderArr } from "../utils/textReader";
import { solve } from "./day11";

const DAY = parseInt(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", () => {
    expect(solve(testInput)).toBe(374);
  });

  it("should solve star 1", () => {
    expect(solve(input)).toBe(10490062);
  });

  it("should pass test star 2", () => {
    expect(solve(testInput, 10)).toBe(1030);
  });

  it("should pass test 2 star 2", () => {
    expect(solve(testInput, 100)).toBe(8410);
  });

  it("should solve star 2", () => {
    expect(solve(input, 1000000)).toBe(382979724122);
  });
});
