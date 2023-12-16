import { textReaderArr } from "../utils/textReader";
import { solveStar1, solveStar2 } from "./day13";

const DAY = parseInt(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", () => {
    expect(solveStar1(testInput)).toBe(405);
  });

  it("should solve star 1", () => {
    expect(solveStar1(input)).toBe(32035);
  });

  it("should pass test star 2", () => {
    expect(solveStar2(testInput)).toBe(400);
  });

  it("should solve star 2", () => {
    expect(solveStar2(input)).toBe(24847);
  });
});
