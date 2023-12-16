import { textReaderArr } from "../utils/textReader";
import { solve1Star, solve2Star } from "./day05";

const DAY = Number(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", () => {
    expect(solve1Star(testInput)).toBe(35);
  });

  it("should solve star 1", () => {
    expect(solve1Star(input)).toBe(318728750);
  });

  it("should pass test star 2", () => {
    expect(solve2Star(testInput)).toBe(46);
  });

  it("should solve star 2", () => {
    expect(solve2Star(input)).toBe(37384986);
  });
});
