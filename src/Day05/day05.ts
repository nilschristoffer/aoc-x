type Range = {
  srcStart: number;
  destStart: number;
  length: number;
};

type Map = Range[];

type SeedRange = {
  start: number;
  length: number;
};

const startsWithNumber = (str: string): boolean =>
  !!str[0] && str[0] >= "0" && str[0] <= "9";

const isEmptyLine = (str: string): boolean => str.trim() === "";

const isWithinRange = (val: number, start: number, length: number): boolean =>
  val >= start && val < start + length;

const initMaps = (input: string[]): Map[] => {
  let range: Map = [];
  const maps: Map[] = input
    .slice(3)
    .map((line) => {
      if (startsWithNumber(line)) {
        const [destStart, srcStart, length] = line
          .split(" ")
          .map((str) => parseInt(str));
        range.push({ srcStart, destStart, length });
      }

      if (isEmptyLine(line)) {
        const map = range;
        range = [];
        return map;
      }
      return null;
    })
    .filter(Boolean) as Map[];

  maps.push(range);
  return maps;
};

const initSeeds = (input: string[]): number[] =>
  input[0].split(": ")[1].split(" ").map(Number);

const initSeedRanges = (input: string[]): SeedRange[] => {
  const seedNumbers = input[0].split(": ")[1].split(" ").map(Number);

  return seedNumbers.reduce(
    (seeds: SeedRange[], num: number, index: number) => {
      if (index % 2 === 0) {
        seeds.push({
          start: num,
          length: seedNumbers[index + 1],
        });
      }
      return seeds;
    },
    []
  );
};

const mapSrcToDest = (src: number, map: Map): number => {
  const range = map.find((range) =>
    isWithinRange(src, range.srcStart, range.length)
  );

  return range ? range.destStart + (src - range.srcStart) : src;
};

export const solve1Star = (input: string[]) => {
  const initialSeeds = initSeeds(input);
  const maps = initMaps(input);

  const finalSeeds = initialSeeds.map((seed) =>
    maps.reduce(mapSrcToDest, seed)
  );
  return Math.min(...finalSeeds);
};

const mapDestToSrc = (dest: number, map: Map): number => {
  const range = map.find((range) =>
    isWithinRange(dest, range.destStart, range.length)
  );

  return range ? range.srcStart + (dest - range.destStart) : dest;
};

export const solve2Star = (input: string[]) => {
  const initialSeeds = initSeedRanges(input);
  const maps = initMaps(input);
  maps.reverse();
  let location = 0;

  while (true) {
    const source = maps.reduce(mapDestToSrc, location);

    const isValidSeedRange = initialSeeds.some((seed) =>
      isWithinRange(source, seed.start, seed.length)
    );

    if (isValidSeedRange) {
      return location;
    }
    location++;
  }
};
