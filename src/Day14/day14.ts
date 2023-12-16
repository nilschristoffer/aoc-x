const CUBE = "#";
const ROUND = "O";

const totalLoad = (platform: string[]) =>
  platform.reduce(
    (acc, curr, i) =>
      acc +
      curr.split("").filter((c) => c === ROUND).length * (platform.length - i),
    0
  );

const tiltNorth = (platform: string[]) =>
  rotate90(tilt(rotate90(platform), "right"), false);

const tiltSouth = (platform: string[]) =>
  rotate90(tilt(rotate90(platform), "left"), false);

const tiltEast = (platform: string[]) => tilt(platform, "right");

const tiltWest = (platform: string[]) => tilt(platform, "left");

const cycle = (platform: string[]): string[] =>
  [tiltNorth, tiltWest, tiltSouth, tiltEast].reduce(
    (acc, curr) => curr(acc),
    platform
  );

const rotate90 = (platform: string[], clockwise = true) => {
  const newPlatform: string[] = Array.from(
    { length: platform.length },
    () => ""
  );

  for (let i = 0; i < platform.length; i++) {
    for (let j = 0; j < platform.length; j++) {
      if (clockwise) {
        newPlatform[i] += platform[platform.length - 1 - j][i];
      } else {
        newPlatform[i] += platform[j][platform.length - 1 - i];
      }
    }
  }
  return newPlatform;
};

const tilt = (platform: string[], dir: "left" | "right") =>
  platform.map((row) =>
    row
      .split(CUBE)
      .map((section) =>
        [...section.split("")]
          .sort((a, b) =>
            dir === "right" ? a.localeCompare(b) : b.localeCompare(a)
          )
          .join("")
      )
      .join(CUBE)
  );

export const solveStar1 = (input: string[]) => {
  const tiltedPlarformNorth = rotate90(tilt(rotate90(input), "right"), false);
  return totalLoad(tiltedPlarformNorth);
};

const findRepeatingPattern = (
  arr: number[],
  size: number
): number[] | undefined => {
  if (arr.length / 2 < size) {
    return undefined;
  }
  const pattern = arr.slice(arr.length - size);
  const rest = arr.slice(0, arr.length - size);
  return rest.slice(rest.length - size).join("") === pattern.join("")
    ? pattern
    : undefined;
};

const findRepeatingPatternSize = (arr: number[]): number[] | undefined => {
  for (let i = 5; i < arr.length / 2; i++) {
    const pattern = findRepeatingPattern(arr, i);
    if (pattern) {
      return pattern;
    }
  }
  return undefined;
};

export const solveStar2 = (input: string[]) => {
  const totCycles = 1000000000;
  let platform = input;
  let cyclesDone = 0;
  const loads = [] as number[];
  let pattern: number[] | undefined = undefined;
  while (!pattern) {
    platform = cycle(platform);
    loads.push(totalLoad(platform));
    pattern = findRepeatingPatternSize(loads);
    cyclesDone++;
  }

  console.log(
    `Found repeating pattern with size ${pattern.length} after ${cyclesDone} cycles`
  );
  const cyclesLeft = totCycles - cyclesDone - 1;
  const cyclesLeftInPattern = cyclesLeft % pattern.length;
  const total = pattern[cyclesLeftInPattern];
  return total;
};
