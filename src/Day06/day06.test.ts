import { textReaderArr } from "../utils/textReader";
import { solveStar1, solveStar2 } from "./day06";

const DAY = Number(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", () => {
    expect(solveStar1(testInput)).toBe(288);
  });

  it("should solve star 1", () => {
    expect(solveStar1(input)).toBe(625968);
  });

  it("should pass test star 2", () => {
    expect(solveStar2(testInput)).toBe(71503);
  });

  it("should solve star 2", () => {
    expect(solveStar2(input)).toBe(43663323);
  });
});
