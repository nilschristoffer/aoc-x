import { textReaderArr } from "../utils/textReader";
import { solveStar1, solveStar2, hashString } from "./day15";

const DAY = parseInt(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should hash", () => {
    expect(hashString("HASH")).toBe(52);
    expect(hashString("rn=1")).toBe(30);
    expect(hashString("ab=5")).toBe(197);
  });

  it("should pass test", () => {
    expect(solveStar1(testInput)).toBe(1320);
  });

  it("should solve star 1", () => {
    expect(solveStar1(input)).toBe(507291);
  });

  it("should pass test star 2", () => {
    expect(solveStar2(testInput)).toBe(145);
  });

  it("should solve star 2", () => {
    expect(solveStar2(input)).toBe(296921);
  });
});
