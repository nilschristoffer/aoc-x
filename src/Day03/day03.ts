const startsWithNumber = (
  str: string
): { value: number; length: number } | undefined => {
  const match = str.match(/^\d+/);
  if (!match) {
    return undefined;
  }
  const value = parseInt(match[0], 10);
  return {
    value,
    length: match[0].length,
  };
};

const getAdjacentSymbols = (
  num: { length: number; row: number; col: number },
  map: string[]
): string => {
  let adjacentSymbols: string = "";
  for (
    let r = Math.max(0, num.row - 1);
    r <= Math.min(map.length - 1, num.row + 1);
    r++
  ) {
    for (
      let c = Math.max(0, num.col - 1);
      c <= Math.min(map[r].length - 1, num.col + num.length);
      c++
    ) {
      if (!(r === num.row && c >= num.col && c <= num.col + num.length - 1)) {
        adjacentSymbols += map[r][c];
      }
    }
  }
  return adjacentSymbols;
};

export const solve1Star = (input: string[]): number => {
  let partNumbers: number[] = [];
  let notPartNumbers: number[] = [];
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const rest = input[row].slice(col);
      const match = startsWithNumber(rest);
      if (!match) {
        continue;
      }
      const adjacentSymbols = getAdjacentSymbols(
        { length: match.length, row, col },
        input
      );
      const isPartNumber = !adjacentSymbols
        .split("")
        .every((char) => char === ".");
      if (isPartNumber) {
        partNumbers.push(match.value);
      } else {
        notPartNumbers.push(match.value);
      }
      col += match.length - 1;
    }
  }
  return partNumbers.reduce((acc, num) => acc + num, 0);
};

type Gear = { id: string; adjacentNumbers?: number[] };
const getAdjacentGears = (
  num: { length: number; row: number; col: number },
  map: string[]
): Gear[] => {
  let gears: Gear[] = [];
  for (
    let r = Math.max(0, num.row - 1);
    r <= Math.min(map.length - 1, num.row + 1);
    r++
  ) {
    for (
      let c = Math.max(0, num.col - 1);
      c <= Math.min(map[r].length - 1, num.col + num.length);
      c++
    ) {
      if (!(r === num.row && c >= num.col && c <= num.col + num.length - 1)) {
        if (map[r][c] === "*") {
          gears.push({ id: `${r},${c}` });
        }
      }
    }
  }
  return gears;
};

type GearNumbers = {
  value: number;
  id: string;
  gears: Gear[];
};

export const solve2Star = (input: string[]): number => {
  let gearNumbers: GearNumbers[] = [];
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const rest = input[row].slice(col);
      const match = startsWithNumber(rest);
      if (!match) {
        continue;
      }

      const adjacentGears = getAdjacentGears(
        { length: match.length, row, col },
        input
      );

      if (adjacentGears.length > 0) {
        gearNumbers.push({
          value: match.value,
          id: `${row},${col}`,
          gears: adjacentGears,
        });
      }

      col += match.length - 1;
    }
  }

  const allGears: { [gearId: string]: number[] } = gearNumbers.reduce(
    (acc, gearNumber) => {
      gearNumber.gears.forEach((gear) => {
        if (!acc[gear.id]) {
          acc[gear.id] = [];
        }
        acc[gear.id].push(gearNumber.value);
      });
      return acc;
    },
    {} as { [gearId: string]: number[] }
  );

  const gearsWithTwoNumbers: number[][] = Object.values(allGears).filter(
    (gearNumbers) => gearNumbers.length === 2
  );

  return gearsWithTwoNumbers.reduce((acc, num) => acc + num[0] * num[1], 0);
};
