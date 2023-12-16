import { textReaderArr } from "../utils/textReader";
import { triggerSendSolution } from "../utils/triggerScripts";
import { solveStar1, solveStar2 } from "./day07";

const DAY = Number(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", async () => {
    expect(solveStar1(testInput)).toBe(6440);
  });

  it("should solve star 1", () => {
    expect(solveStar1(input)).toBe(251058093);
  });

  it("should pass test star 2", () => {
    expect(solveStar2(testInput)).toBe(5905);
  });

  it("should solve star 2", () => {
    expect(solveStar2(input)).toBe(249781879);
  });
});
