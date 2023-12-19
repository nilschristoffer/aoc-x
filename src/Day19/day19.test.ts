import { textReaderArr } from "../utils/textReader";
import { solveStar1, solveStar2 } from "./day19";

const DAY = parseInt(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", () => {
    expect(solveStar1(testInput)).toBe(19114);
  });

  it("should solve star 1", () => {
    expect(solveStar1(input)).toBe(374873);
  });

  it("should pass test star 2", () => {
    expect(solveStar2(testInput)).toBe(167409079868000);
  });

  it("should solve star 2", () => {
    expect(solveStar2(input)).toBe(122112157518711);
  });
});
