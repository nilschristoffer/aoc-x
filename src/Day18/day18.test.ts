import { textReaderArr } from "../utils/textReader";
import { solveStar1, solveStar2 } from "./day18";

const DAY = parseInt(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", () => {
    expect(solveStar1(testInput)).toBe(62);
  });

  it("should solve star 1", () => {
    expect(solveStar1(input)).toBe(62500);
  });

  it("should pass test star 2", () => {
    expect(solveStar2(testInput)).toBe(952408144115);
  });

  it("should solve star 2", () => {
    expect(solveStar2(input)).toBe(122109860712709);
  });
});
