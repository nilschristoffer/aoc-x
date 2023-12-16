import { textReaderArr } from "../utils/textReader";
import { solveStar1, solveStar2 } from "./day09";

const DAY = parseInt(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", () => {
    expect(solveStar1(testInput)).toBe(114);
  });

  it("should solve star 1", () => {
    expect(solveStar1(input)).toBe(1916822650);
  });

  it("should pass test star 2", () => {
    expect(solveStar2(testInput)).toBe(2);
  });

  it("should solve star 2", () => {
    expect(solveStar2(input)).toBe(966);
  });
});
