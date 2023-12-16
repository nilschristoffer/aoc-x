import { textReaderArr } from "../utils/textReader";
import { solveStar } from "./day12";

const DAY = parseInt(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", () => {
    expect(solveStar(testInput)).toBe(21);
  });

  it("should solve star 1", () => {
    expect(solveStar(input)).toBe(6935);
  });

  it("should pass test star 2", () => {
    expect(solveStar(testInput, 5)).toBe(525152);
    // 7 ms
  });

  it("should solve star 2 5", () => {
    // expect(solveStar(input, 5)).toBe(3920437278260);
    // 766.592 s... (test x100.000)
  });
});
