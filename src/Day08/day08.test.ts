import { textReaderArr } from "../utils/textReader";
import { solveStar1, solveStar2 } from "./day08";

const DAY = parseInt(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const test2Input = textReaderArr(DAY, "test2");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", () => {
    expect(solveStar1(testInput)).toBe(6);
  });

  it("should solve star 1", () => {
    expect(solveStar1(input)).toBe(19637);
  });

  it("should pass test star 2", () => {
    expect(solveStar2(test2Input)).toBe(6);
  });

  it("should solve star 2", () => {
    expect(solveStar2(input)).toBe(8811050362409);
  });
});
