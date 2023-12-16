type Galaxy = {
  x: number;
  y: number;
};

const shortestPath = (a: Galaxy, b: Galaxy) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const findGalaxiesOnRow = (row: string, rowIndex: number) =>
  row
    .split("")
    .map((char, x) => (char === "#" ? { x, y: rowIndex } : null))
    .filter(Boolean) as Galaxy[];

export const solve = (input: string[], emptySize = 2) => {
  const galaxies = input.map(findGalaxiesOnRow).flat();

  const allYs = galaxies.map((g) => g.y);
  const minY = Math.min(...allYs);
  const maxY = Math.max(...allYs);
  const yWithoutGalaxies = Array.from(
    { length: maxY - minY - 1 },
    (_, i) => i + minY + 1
  ).filter((y) => !allYs.includes(y));

  const allXs = galaxies.map((g) => g.x);
  const minX = Math.min(...allXs);
  const maxX = Math.max(...allXs);
  const xWithoutGalaxies = Array.from(
    { length: maxX - minX - 1 },
    (_, i) => i + minX + 1
  ).filter((x) => !allXs.includes(x));

  const emptyLinesBetweenGalaxies = (a: Galaxy, b: Galaxy) =>
    xWithoutGalaxies.filter(
      (x) => x > Math.min(a.x, b.x) && x < Math.max(a.x, b.x)
    ).length +
    yWithoutGalaxies.filter(
      (y) => y > Math.min(a.y, b.y) && y < Math.max(a.y, b.y)
    ).length;

  return galaxies.reduce(
    (acc, galaxy, index, arr) =>
      acc +
      arr
        .slice(index + 1)
        .reduce(
          (acc2, otherGalaxy) =>
            acc2 +
            shortestPath(galaxy, otherGalaxy) +
            emptyLinesBetweenGalaxies(galaxy, otherGalaxy) * (emptySize - 1),
          0
        ),
    0
  );
};
