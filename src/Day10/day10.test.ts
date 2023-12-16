import { textReaderArr } from "../utils/textReader";
import { solveStar1, solveStar2, solveStar2Alt } from "./day10";

const DAY = parseInt(
  __filename.split("/").pop()!.split(".")[0].replace("day", "")
);

const testInput = textReaderArr(DAY, "test");
const test2Input = textReaderArr(DAY, "test2");
const test3Input = textReaderArr(DAY, "test3");
const test4Input = textReaderArr(DAY, "test4");
const test5Input = textReaderArr(DAY, "test5");
const input = textReaderArr(DAY, "input");

describe("Day " + DAY, () => {
  it("should pass test", () => {
    expect(solveStar1(testInput)).toBe(4);
    expect(solveStar1(test2Input)).toBe(8);
  });

  it("should solve star 1", () => {
    expect(solveStar1(input)).toBe(6846);
  });

  it("should pass test 1 star 2", () => {
    expect(solveStar2(testInput)).toBe(1);
  });

  it("should pass test 2 star 2", () => {
    expect(solveStar2(test2Input)).toBe(1);
  });

  it("should pass test 3 star 2", () => {
    expect(solveStar2(test3Input)).toBe(4);
  });

  it("should pass test 4 star 2", () => {
    expect(solveStar2(test4Input)).toBe(8);
  });

  it("should pass test 5 star 2", () => {
    expect(solveStar2(test5Input)).toBe(10);
  });

  it("should solve star 2", () => {
    expect(solveStar2(input)).toBe(325);
  });

  it("should solve star 2 alt", () => {
    // expect(solveStar2Alt(input)).toBe(325);
  });
});
