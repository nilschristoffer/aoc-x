type Point = {
  x: number;
  y: number;
};

const equalPoint = (p1: Point, p2: Point): boolean =>
  p1.x === p2.x && p1.y === p2.y;

const areEqual = (p1: Point) => (p2: Point) => equalPoint(p1, p2);

const getOutlets = (currPipe: string, { x, y }: Point) => {
  const north = { x, y: y - 1 };
  const east = { x: x + 1, y };
  const south = { x, y: y + 1 };
  const west = { x: x - 1, y };

  return (
    {
      S: [north, east, south, west],
      "7": [south, west],
      J: [north, west],
      F: [south, east],
      L: [north, east],
      "-": [east, west],
      "|": [north, south],
    }[currPipe] ?? []
  );
};

const findStart = (map: string[]): Point => {
  const y = map.findIndex((row) => row.includes("S"));
  const x = map[y].indexOf("S");
  return { x, y };
};

const getLoop = (input: string[]): { loop: Point[]; area: number } => {
  const start = findStart(input);
  const width = input[0].length;
  const height = input.length;
  const loop = [start];
  let signedArea = 0;
  while (true) {
    const currPos = loop[loop.length - 1];
    const currPipe = input[currPos.y][currPos.x];
    const prevPos = loop[loop.length - 2];
    const possibleOutlets = getOutlets(currPipe, currPos)
      .filter((p) => p.x >= 0 && p.x < width && p.y >= 0 && p.y < height)
      .filter((p) => getOutlets(input[p.y][p.x], p)?.some(areEqual(currPos)))
      .filter((p) => !(prevPos && equalPoint(p, prevPos)));

    const nextPos = possibleOutlets[0];

    signedArea += (currPos.x * nextPos.y - nextPos.x * currPos.y) / 2;

    if (equalPoint(nextPos, start)) {
      return { loop, area: Math.abs(signedArea) };
    }
    loop.push(nextPos);
  }
};

export const solveStar1 = (input: string[]): number => {
  return getLoop(input).loop.length / 2;
};

export const solveStar2 = (input: string[]): number => {
  const { loop, area } = getLoop(input);
  const loopInsideArea = loop.length / 2 - 1;
  return area - loopInsideArea;
};

// Alternative solution for star 2
const crossingVerticals = (vector: string) =>
  vector.split("").filter((c) => ["|"].includes(c)).length +
  Math.abs(
    vector.split("").filter((c) => ["L", "7"].includes(c)).length -
      vector.split("").filter((c) => ["F", "J"].includes(c)).length
  ) /
    2;

const clearMap = (input: string[], loop: Point[]): string[] => {
  const startNeighbours = [loop[1], loop[loop.length - 1]];
  const startSign = ["-", "|", "7", "J", "L", "F"].find((sign) =>
    getOutlets(sign, loop[0])?.every((p) => startNeighbours.some(areEqual(p)))
  );
  const clearedMap = input.map((row, y) =>
    row
      .split("")
      .map((c, x) => {
        if (equalPoint(loop[0], { x, y })) return startSign;
        if (loop.some(areEqual({ x, y }))) return c;
        return " ";
      })
      .join("")
  );
  return clearedMap;
};

const getInsidePoints = (input: string[], loop: Point[]): Point[] => {
  const clearedMap = clearMap(input, loop);
  const allXs = loop.map((p) => p.x);
  const allYs = loop.map((p) => p.y);
  const minY = Math.min(...allYs);
  const maxY = Math.max(...allYs);
  const minX = Math.min(...allXs);
  const maxX = Math.max(...allXs);
  const insidePoints = Array.from({ length: maxY - minY })
    .map((_, y) => y + minY)
    .flatMap((y) =>
      Array.from({ length: maxX - minX })
        .map((_, x) => x + minX)
        .filter((x) => !loop.some(areEqual({ x, y })))
        .map((x) => {
          const rightSubstring = clearedMap[y].substring(x);
          const intersections = crossingVerticals(rightSubstring);
          return { x, y, intersections };
        })
    )
    .filter((p) => p.intersections % 2 === 1);
  return insidePoints;
};

export const solveStar2Alt = (input: string[]): number => {
  const { loop } = getLoop(input);
  const insidePoints = getInsidePoints(input, loop);

  return insidePoints.length;
};
