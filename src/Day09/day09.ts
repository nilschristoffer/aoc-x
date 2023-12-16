import { last, first, sum } from "../utils/helpers";

const readRow = (row: string) => row.split(" ").map(Number);

const getDifferences = (row: number[]) =>
  row.slice(1).map((value, index) => value - row[index]);

const predictNextValue = (row: number[]) => {
  const rows = [row];
  while (last(rows).some(Boolean)) {
    rows.push(getDifferences(last(rows)));
  }

  last(rows).push(0);

  for (let i = rows.length - 2; i >= 0; i--)
    rows[i].push(last(rows[i + 1]) + last(rows[i]));

  return last(first(rows));
};

export const solveStar1 = (input: string[]) =>
  input.map(readRow).map(predictNextValue).reduce(sum, 0);

export const solveStar2 = (input: string[]) =>
  input
    .map(readRow)
    .map((row) => row.reverse())
    .map(predictNextValue)
    .reduce(sum, 0);
