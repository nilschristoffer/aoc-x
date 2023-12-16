const VERTICAL_SPLITTER = "|";
const HORIZONTAL_SPLITTER = "-";
const TOP_LEFT_MIRROR = "\\";
const TOP_RIGHT_MIRROR = "/";
const EMPTY = ".";

type Point = {
  x: number;
  y: number;
};

type BeamPoint = Point & {
  direction: Direction;
};

type Direction = "up" | "down" | "left" | "right";

type VisitedMap = {
  [key: string]: Direction[];
};

const pointKey = ({ x, y }: Point) => x + "," + y;

const move = ({ x, y, direction }: BeamPoint): BeamPoint => {
  switch (direction) {
    case "up":
      return { x: x, y: y - 1, direction };
    case "down":
      return { x: x, y: y + 1, direction };
    case "left":
      return { x: x - 1, y: y, direction };
    case "right":
      return { x: x + 1, y: y, direction };
  }
};

const getNextBeamPoints = (
  { x, y, direction }: BeamPoint,
  char: string
): BeamPoint[] => {
  switch (char) {
    case EMPTY:
      return [move({ x, y, direction })];
    case HORIZONTAL_SPLITTER:
      switch (direction) {
        case "left":
        case "right":
          return [move({ x, y, direction })];
        case "up":
        case "down":
          return [
            move({ x, y, direction: "left" }),
            move({ x, y, direction: "right" }),
          ];
      }
      return [];
    case VERTICAL_SPLITTER:
      switch (direction) {
        case "up":
        case "down":
          return [move({ x, y, direction })];
        case "left":
        case "right":
          return [
            move({ x, y, direction: "up" }),
            move({ x, y, direction: "down" }),
          ];
      }
      return [];
    case TOP_LEFT_MIRROR:
      switch (direction) {
        case "up":
          return [move({ x, y, direction: "left" })];
        case "left":
          return [move({ x, y, direction: "up" })];
        case "right":
          return [move({ x, y, direction: "down" })];
        case "down":
          return [move({ x, y, direction: "right" })];
      }
      return [];

    case TOP_RIGHT_MIRROR:
      switch (direction) {
        case "up":
          return [move({ x, y, direction: "right" })];
        case "left":
          return [move({ x, y, direction: "down" })];
        case "right":
          return [move({ x, y, direction: "up" })];
        case "down":
          return [move({ x, y, direction: "left" })];
      }
      return [];
  }
  return [];
};

const getEnergy = (input: string[], startBeam: BeamPoint) => {
  const visitedMap: VisitedMap = {};

  const minX = 0;
  const maxX = input[0].length - 1;
  const minY = 0;
  const maxY = input.length - 1;

  const filterOutsidePoints = ({ x, y }: BeamPoint) =>
    x >= minX && x <= maxX && y >= minY && y <= maxY;

  const filterVisitedPoints = ({ x, y, direction }: BeamPoint) => {
    const key = pointKey({ x, y });
    return !visitedMap[key]?.includes(direction);
  };

  const addVisitedPoint = ({ x, y, direction }: BeamPoint) => {
    const key = pointKey({ x, y });
    if (!visitedMap[key]) {
      visitedMap[key] = [];
    }
    input[y][x] !== EMPTY && visitedMap[key].push(direction);
  };

  const queue: BeamPoint[] = [startBeam];

  while (queue.length > 0) {
    const current = queue.pop()!;
    addVisitedPoint(current);
    const nextPoints = getNextBeamPoints(current, input[current.y][current.x])
      .filter(filterOutsidePoints)
      .filter(filterVisitedPoints);
    queue.push(...nextPoints);
  }

  return Object.keys(visitedMap).length;
};

export const solveStar1 = (input: string[]) => {
  return getEnergy(input, { x: 0, y: 0, direction: "right" });
};

export const solveStar2 = (input: string[]) => {
  const leftBorderPoints: BeamPoint[] = input.map((row, y) => ({
    x: 0,
    y,
    direction: "right",
  }));
  const rightBorderPoints: BeamPoint[] = input.map((row, y) => ({
    x: row.length - 1,
    y,
    direction: "left",
  }));
  const topBorderPoints: BeamPoint[] = input[0]
    .split("")
    .map((_, x) => ({ x, y: 0, direction: "down" }));
  const bottomBorderPoints: BeamPoint[] = input[input.length - 1]
    .split("")
    .map((_, x) => ({ x, y: input.length - 1, direction: "up" }));

  const borderPoints = [
    ...leftBorderPoints,
    ...rightBorderPoints,
    ...topBorderPoints,
    ...bottomBorderPoints,
  ];

  const maxEnery = borderPoints.reduce((max, startBeam) => {
    const energy = getEnergy(input, startBeam);
    return Math.max(max, energy);
  }, 0);

  return maxEnery;
};
