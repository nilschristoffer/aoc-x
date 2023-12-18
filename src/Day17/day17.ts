type Point = {
  x: number;
  y: number;
  direction?: Direction;
};

type Direction = "up" | "down" | "left" | "right";

type HeatPoint = Point & {
  heat: number;
};

type VisitedHeatPoint = HeatPoint & {
  accHeat: number;
  dirCount: number;
  stateKey: string;
  previous?: VisitedHeatPoint;
  fScore: number;
};

const stateKey = ({
  x,
  y,
  direction,
  dirCount,
}: Omit<VisitedHeatPoint, "stateKey" | "fScore">) =>
  x + "," + y + "," + direction + "," + dirCount;

const manhattanDistance = (a: Point, b: Point) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export const solveStar1 = (input: string[]) => {
  const heatMap: number[][] = input.map((row) => row.split("").map(Number));
  const minX = 0;
  const maxX = heatMap[0].length - 1;
  const minY = 0;
  const maxY = heatMap.length - 1;

  const endPoint = { x: maxX, y: maxY };

  const maxHeat = 9 * manhattanDistance(endPoint, { x: minX, y: minY });

  const fScore = (point: Omit<VisitedHeatPoint, "stateKey" | "fScore">) =>
    point.accHeat + point.heat + manhattanDistance(point, endPoint);

  let alreadyVisitedPoints: { [stateKey: string]: number } = {};

  const queue: VisitedHeatPoint[] = [
    {
      x: 0,
      y: 1,
      heat: heatMap[1][0],
      direction: "down" as Direction,
      accHeat: 0,
      dirCount: 1,
      stateKey: "0,1,down,1",
      fScore: manhattanDistance({ x: 0, y: 1 }, endPoint),
    },
    {
      x: 1,
      y: 0,
      heat: heatMap[0][1],
      direction: "right" as Direction,
      accHeat: 0,
      dirCount: 1,
      stateKey: "1,0,right,1",
      fScore: manhattanDistance({ x: 1, y: 0 }, endPoint),
    },
  ];
  const filterOutsidePoints = ({ x, y }: Point): boolean =>
    x >= minX && x <= maxX && y >= minY && y <= maxY;

  const filterVisitedPoints = ({
    previous: prev,
    x,
    y,
  }: VisitedHeatPoint): boolean => {
    const point = { x, y };
    let current = prev;
    while (current) {
      if (current.x === point.x && current.y === point.y) {
        return false;
      }
      current = current.previous!;
    }
    return true;
  };

  // part 1
  const filterNoMoreThan3StepsInEachDirection = ({
    dirCount,
  }: VisitedHeatPoint): boolean => dirCount < 4;

  // part 2
  const filterMin4Max10Steps = ({
    dirCount,
    previous,
    direction,
  }: VisitedHeatPoint): boolean => {
    if (dirCount > 10) {
      return false;
    }

    // find first previuos with other direction
    let current = previous;
    while (current) {
      if (current.direction !== direction) {
        break;
      }
      current = current.previous!;
    }
    if (!current) {
      return true;
    }
    if (current.dirCount < 4) {
      return false;
    }

    return true;
  };

  const filterAlreadyVisitedPoints = ({
    stateKey,
    fScore,
  }: VisitedHeatPoint): boolean => {
    if (
      alreadyVisitedPoints[stateKey] &&
      alreadyVisitedPoints[stateKey] <= fScore
    ) {
      return false;
    }
    alreadyVisitedPoints[stateKey] = fScore;
    return true;
  };

  const filterMaxAccHeat = ({ accHeat }: VisitedHeatPoint): boolean =>
    accHeat <= maxHeat;

  const addToQueue = (point: VisitedHeatPoint) => {
    const existing = queue.find((p) => p.stateKey === point.stateKey);

    if (!existing || point.fScore < existing.fScore) {
      existing && queue.splice(queue.indexOf(existing), 1);
      const index = queue.findIndex((p) => p.fScore < point.fScore);
      if (index === -1) {
        queue.push(point);
      } else {
        queue.splice(index, 0, point);
      }
    }
  };

  const nextPossiblePoints = (point: VisitedHeatPoint): VisitedHeatPoint[] =>
    [
      {
        x: point.x + 1,
        y: point.y,
        direction: "right" as Direction,
        dirCount: point.direction === "right" ? point.dirCount + 1 : 1,
        previous: point,
      },
      {
        x: point.x - 1,
        y: point.y,
        direction: "left" as Direction,
        dirCount: point.direction === "left" ? point.dirCount + 1 : 1,
        previous: point,
      },
      {
        x: point.x,
        y: point.y + 1,
        direction: "down" as Direction,
        dirCount: point.direction === "down" ? point.dirCount + 1 : 1,
        previous: point,
      },
      {
        x: point.x,
        y: point.y - 1,
        direction: "up" as Direction,
        dirCount: point.direction === "up" ? point.dirCount + 1 : 1,
        previous: point,
      },
    ]
      .filter(filterOutsidePoints)
      .map((p) => ({
        ...p,
        heat: heatMap[p.y][p.x],
        accHeat: point.accHeat + point.heat,
        dirCount: point.direction === p.direction ? point.dirCount + 1 : 1,
      }))
      .map((p) => ({ ...p, stateKey: stateKey(p), fScore: fScore(p) }))
      .filter(filterMaxAccHeat)
      // part 1
      // .filter(filterNoMoreThan3StepsInEachDirection)
      // part 2
      .filter(filterMin4Max10Steps)
      .filter(filterVisitedPoints)
      .filter(filterAlreadyVisitedPoints);

  while (queue.length > 0) {
    const point = queue.pop()!;

    if (point.x === endPoint.x && point.y === endPoint.y) {
      return point.accHeat + point.heat;
    }

    const next = nextPossiblePoints(point);

    next.forEach(addToQueue);
  }
  return -2;
};

export const solveStar2 = (input: string[]) => {
  return 0;
};
