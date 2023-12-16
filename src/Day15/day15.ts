const hashChar = (startVal: number, c: string) => {
  let v = startVal;
  v += c.charCodeAt(0);
  v *= 17;
  return v % 256;
};

export const hashString = (input: string) =>
  input.split("").reduce(hashChar, 0);

const lensToAdd = (c: string) => {
  const [label, focalLength] = c.split("=");
  return {
    lens: { label, focalLength: Number(focalLength) },
    box: hashString(label),
  };
};

const lensToRemove = (c: string) => {
  const [label] = c.split("-");
  return { label, box: hashString(label) };
};

type Lens = { label: string; focalLength: number };

const focalPower = (box: number, slot: number, focalLength: number) =>
  (1 + box) * (1 + slot) * focalLength;

export const solveStar1 = (input: string[]) =>
  input
    .map((line) => line.split(",").map(hashString))
    .flat()
    .reduce((acc, cur) => acc + cur);

export const solveStar2 = (input: string[]) => {
  const initializionSequence = input.map((line) => line.split(",")).flat();
  const boxes: { [box: number]: Lens[] } = Array.from(
    { length: 256 },
    () => [] as Lens[]
  ).reduce((acc, curr, boxIndex) => {
    acc[boxIndex] = curr;
    return acc;
  }, {} as { [box: number]: Lens[] });

  initializionSequence.forEach((instruction) => {
    if (instruction.includes("=")) {
      const { box, lens } = lensToAdd(instruction);

      if (boxes[box].some((l) => l.label === lens.label)) {
        boxes[box] = boxes[box].map((l) => (l.label === lens.label ? lens : l));
      } else {
        boxes[box].push(lens);
      }
    }

    if (instruction.endsWith("-")) {
      const { box, label } = lensToRemove(instruction);
      boxes[box] = boxes[box].filter((l) => l.label !== label);
    }
  });

  return Object.entries(boxes).reduce(
    (acc, [box, lenses]) =>
      acc +
      lenses.reduce(
        (acc2, { focalLength }, slot) =>
          acc2 + focalPower(Number(box), slot, focalLength),
        0
      ),
    0
  );
};
