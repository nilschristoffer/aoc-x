import { start } from "repl";
import { store } from "../Stats/store";

const DAMAGED = "#";
const UNDAMAGED = ".";
const UNKNOWN = "?";

type QueueValue = {
  key: string;
  parent?: QueueValue;
  springs: string;
  knownDamages: number[];
  minNext: number;
  unknownIndex: number;
};

const repeat = (str: string, times: number, separator: string): string => {
  return Array.from({ length: times }, () => str).join(separator);
};

const equalNumberArrays = (a: number[], b: number[]): boolean =>
  a.length === b.length && a.every((v, i) => v === b[i]);

const getDamagedGroups = (
  springs: string,
  minNext: number,
  startIndex: number
): {
  known: number[];
  minNext: number;
} => {
  const knownGroups = [];
  let currentGroup = minNext;

  for (let i = startIndex; i < springs.length; i++) {
    switch (springs[i]) {
      case DAMAGED:
        currentGroup++;
        break;
      case UNDAMAGED:
        if (currentGroup > 0) {
          knownGroups.push(currentGroup);
          currentGroup = 0;
        }
        break;
      case UNKNOWN:
        return { known: knownGroups, minNext: currentGroup };
    }
  }

  if (currentGroup > 0) knownGroups.push(currentGroup);

  return {
    known: knownGroups,
    minNext: 0,
  };
};

const goalFunction = (
  value: QueueValue,
  damagedGroup: DamageGroup
): boolean => {
  const hasUnknown = value.unknownIndex > -1;

  if (hasUnknown) {
    return false;
  }

  return equalNumberArrays(value.knownDamages, damagedGroup.groups);
};

const stopFunction = (
  damagedGroup: DamageGroup,
  { unknownIndex, springs, knownDamages, minNext }: QueueValue
): boolean => {
  const areEqualArrays = equalNumberArrays(knownDamages, damagedGroup.groups);
  const hasUnknown = unknownIndex > -1;

  if (!hasUnknown && !areEqualArrays) {
    return true;
  }

  if (
    hasUnknown &&
    springs.substring(unknownIndex).includes(DAMAGED) &&
    areEqualArrays
  ) {
    return true;
  }

  if (
    hasUnknown &&
    springs.length - unknownIndex <
      damagedGroup.groups
        .slice(knownDamages.length + (minNext ? 1 : 0))
        .reduce((a, b, i) => a + b, 0) +
        (damagedGroup.groups.length - knownDamages.length - 1)
  ) {
    return true;
  }

  if (
    knownDamages.length + (minNext ? 1 : 0) > damagedGroup.groups.length ||
    knownDamages.some((d, i) => d !== damagedGroup.groups[i]) ||
    minNext > damagedGroup.groups[knownDamages.length]
  ) {
    return true;
  }

  return false;
};

type DamageGroup = {
  groups: number[];
  total: number;
};

const findAllPossibleArrangementsDepthFirst =
  (copies = 1) =>
  (row: string, idx: number) => {
    const springs = repeat(row.split(" ")[0], copies, "?");

    const goalDamagedGroups = repeat(row.split(" ")[1], copies, ",")
      .split(",")
      .map(Number);

    const goalDamagedGroupsTotal = goalDamagedGroups.reduce((a, b) => a + b, 0);

    const goalDamageGroup: DamageGroup = {
      groups: goalDamagedGroups,
      total: goalDamagedGroupsTotal,
    };

    const { known, minNext } = getDamagedGroups(springs, 0, 0);

    const queue: QueueValue[] = [
      {
        key: "root",
        springs,
        knownDamages: known,
        minNext,
        unknownIndex: springs.indexOf(UNKNOWN),
      },
    ];

    const arrangementCount: { [key: string]: number } = {};
    const addArrangemaent = ({ key, parent }: QueueValue, count = 1) => {
      const currentArrangement = arrangementCount[key];
      if (!currentArrangement) {
        arrangementCount[key] = 0;
      }

      arrangementCount[key] += count;

      if (parent) {
        addArrangemaent(parent, count);
      }
    };

    while (queue.length > 0) {
      const current = queue.pop()!;

      if (arrangementCount[current.key]) {
        addArrangemaent(current.parent!, arrangementCount[current.key]);
        continue;
      }

      if (stopFunction(goalDamageGroup, current)) {
        continue;
      }

      if (goalFunction(current, goalDamageGroup)) {
        addArrangemaent(current.parent!);
        continue;
      }

      // console.log(current);
      // console.log(arrangementCount);

      queue.push(...generateNextPossibleArrangements(current));
    }

    return arrangementCount.root;
    // return possibleArrangements;
  };

const generateNextPossibleArrangements = ({
  springs,
  unknownIndex,
  knownDamages,
  minNext,
  parent,
  key,
}: QueueValue): QueueValue[] => {
  if (unknownIndex === -1) {
    return [];
  }
  const nextPossibleArrangements: QueueValue[] = [];

  const nextUndamgedSpring =
    springs.substring(0, unknownIndex) +
    UNDAMAGED +
    springs.substring(unknownIndex + 1);
  const newUndamedUnknownIndex = nextUndamgedSpring.indexOf(UNKNOWN);

  const { known: newUndamgedKnown, minNext: newUndamgedMinNext } =
    getDamagedGroups(nextUndamgedSpring, minNext, unknownIndex);
  const nextKnownDamagesU = [...knownDamages, ...newUndamgedKnown];
  nextPossibleArrangements.push({
    springs: nextUndamgedSpring,
    knownDamages: nextKnownDamagesU,
    minNext: newUndamgedMinNext,
    unknownIndex: newUndamedUnknownIndex,
    key: `${newUndamedUnknownIndex}-${nextKnownDamagesU}-${newUndamgedMinNext}-${nextUndamgedSpring.substring(
      newUndamedUnknownIndex
    )}`,
    parent: {
      key,
      springs,
      knownDamages,
      minNext,
      unknownIndex,
      parent,
    },
  });

  const nextDamgedSpring =
    springs.substring(0, unknownIndex) +
    DAMAGED +
    springs.substring(unknownIndex + 1);

  const newDamagedUnknownIndex = nextDamgedSpring.indexOf(UNKNOWN);

  const { known: newDamagedKnown, minNext: newDamagedMinNext } =
    getDamagedGroups(nextDamgedSpring, minNext, unknownIndex);
  const nextKnownDamagesD = [...knownDamages, ...newDamagedKnown];
  nextPossibleArrangements.push({
    springs: nextDamgedSpring,
    knownDamages: nextKnownDamagesD,
    minNext: newDamagedMinNext,
    unknownIndex: newDamagedUnknownIndex,
    key: `${newDamagedUnknownIndex}-${nextKnownDamagesD}-${newDamagedMinNext}-${nextDamgedSpring.substring(
      newDamagedUnknownIndex
    )}`,
    parent: {
      key,
      springs,
      knownDamages,
      minNext,
      unknownIndex,
      parent,
    },
  });

  return nextPossibleArrangements;
};

export const solveStar = (input: string[], copies = 1) => {
  const rows = input.map(findAllPossibleArrangementsDepthFirst(copies));
  return rows.reduce((a, b) => a + b, 0);
};
