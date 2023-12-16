const extractDigitsFromString = (str: string): number[] =>
  str
    .split("")
    .filter((char) => !isNaN(parseInt(char, 10)))
    .map((char) => parseInt(char, 10));

const firstAndLastDigit = (digits: number[]) =>
  digits[0] * 10 + digits[digits.length - 1];

export const solve1Star = (input: string[]): number =>
  input.reduce(
    (acc, line) => acc + firstAndLastDigit(extractDigitsFromString(line)),
    0
  );

const digitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
};

const reverseString = (str: string): string => str.split("").reverse().join("");

const findFirst = (str: string, values: string[]) =>
  str.match(values.join("|"))?.[0] as unknown as string;

const findLast = (str: string, values: string[]) =>
  reverseString(
    reverseString(str).match(
      values.map(reverseString).join("|")
    )?.[0] as unknown as string
  );

export const solve2Star = (input: string[]): number =>
  input.reduce(
    (acc, line) =>
      acc +
      digitMap[
        findFirst(line, Object.keys(digitMap)) as keyof typeof digitMap
      ] *
        10 +
      digitMap[findLast(line, Object.keys(digitMap)) as keyof typeof digitMap],
    0
  );
