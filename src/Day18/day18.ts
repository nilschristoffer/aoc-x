type Point = {
  x: number;
  y: number;
};

const signedAreaOfPolygon = (points: Point[]) => {
  const n = points.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    sum += points[i].x * points[j].y - points[j].x * points[i].y;
  }
  return sum / 2;
};

export const solveStar1 = (input: string[]) => {
  const start = { x: 0, y: 0 };
  const points: Point[] = input.reduce(
    (acc, row, y) => {
      const [dir, len] = row.split(" ");
      const last = acc[acc.length - 1];
      const next = { ...last };
      switch (dir) {
        case "R":
          next.x += parseInt(len);
          break;
        case "L":
          next.x -= parseInt(len);
          break;
        case "U":
          next.y -= parseInt(len);
          break;
        case "D":
          next.y += parseInt(len);
          break;
      }
      acc.push(next);
      return acc;
    },
    [start]
  );

  const area = signedAreaOfPolygon(points);
  const size = input
    .map((row) => Number(row.split(" ")[1]))
    .reduce((a, b) => a + b);

  return area + size / 2 + 1;
};

export const solveStar2 = (input: string[]) => {
  const start = { x: 0, y: 0 };
  let borderSize = 0;

  const points: Point[] = input.reduce(
    (acc, row, y) => {
      const hexCode = row.split(" ")[2];
      const size = hexCode.slice(2, hexCode.length - 2);
      const dir = hexCode[hexCode.length - 2];

      const last = acc[acc.length - 1];
      const next = { ...last };
      borderSize += parseInt(size, 16);
      switch (dir) {
        case "0":
          next.x += parseInt(size, 16);
          break;
        case "2":
          next.x -= parseInt(size, 16);
          break;
        case "3":
          next.y -= parseInt(size, 16);
          break;
        case "1":
          next.y += parseInt(size, 16);
          break;
      }
      acc.push(next);
      return acc;
    },
    [start]
  );

  return signedAreaOfPolygon(points) + borderSize / 2 + 1;
};
