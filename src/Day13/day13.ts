const readInput = (input: string[]) => {
  let mirror: string[] = [];
  return input
    .reduce((acc, curr) => {
      if (!curr) {
        acc.push(mirror);
        mirror = [];
      } else {
        mirror.push(curr);
      }
      return acc;
    }, [] as string[][])
    .concat([mirror]);
};

const exactlyOneDiff = (val1: string, val2: string): boolean =>
  val1.split("").filter((char, i) => char !== val2[i]).length === 1;

const transpose = (arr: string[]): string[] =>
  arr
    .reduce(
      (acc, curr) => {
        for (let i = 0; i < curr.length; i++) {
          acc[i].push(curr[i]);
        }
        return acc;
      },
      Array.from({ length: arr[0].length }, () => [] as string[])
    )
    .map((row) => row.join(""));

const checkMirroring = (mirror: string[], rowIndex: number) => {
  let rowIndex1 = rowIndex;
  let rowIndex2 = rowIndex + 1;
  while (rowIndex1 >= 0 && rowIndex2 < mirror.length) {
    if (mirror[rowIndex1] !== mirror[rowIndex2]) {
      return false;
    }
    rowIndex1--;
    rowIndex2++;
  }
  return true;
};

const findMirroringRow = (mirror: string[]): number =>
  mirror
    .slice(0, mirror.length - 1)
    .findIndex((_, i) => checkMirroring(mirror, i)) + 1;

const getMirrorValue = (mirror: string[]): number =>
  findMirroringRow(mirror) * 100 || findMirroringRow(transpose(mirror));

export const solveStar1 = (input: string[]) => {
  const mirrors = readInput(input);
  const mirrorValues = mirrors.map(getMirrorValue);

  return mirrorValues.reduce((acc, curr) => acc + curr, 0);
};

const checkMirroringWith1Diff = (mirror: string[], rowIndex: number) => {
  let rowIndex1 = rowIndex;
  let rowIndex2 = rowIndex + 1;
  let oneDiff = false;
  while (rowIndex1 >= 0 && rowIndex2 < mirror.length) {
    if (exactlyOneDiff(mirror[rowIndex1], mirror[rowIndex2])) {
      if (oneDiff) {
        return false;
      }
      oneDiff = true;
    } else if (mirror[rowIndex1] !== mirror[rowIndex2]) {
      return false;
    }
    rowIndex1--;
    rowIndex2++;
  }
  return oneDiff;
};

const findMirroringRowWith1Diff = (mirror: string[]): number =>
  mirror
    .slice(0, mirror.length - 1)
    .findIndex((_, i) => checkMirroringWith1Diff(mirror, i)) + 1;

const getMirrorValueWith1Diff = (mirror: string[]): number =>
  findMirroringRowWith1Diff(mirror) * 100 ||
  findMirroringRowWith1Diff(transpose(mirror)) ||
  getMirrorValue(mirror);

export const solveStar2 = (input: string[]) => {
  const mirrors = readInput(input);
  const mirrorValues = mirrors.map(getMirrorValueWith1Diff);
  return mirrorValues.reduce((acc, curr) => acc + curr, 0);
};
