type Part = {
  x: number;
  m: number;
  a: number;
  s: number;
};

type Workflows = {
  [name: string]: Rule[];
};

type Rule = (part: Part) => string;

const ACCEPTED = "A";
const REJECTED = "R";
const START = "in";

const readPart = (line: string): Part => {
  const sections = line.split("=");
  const x = sections[1].split(",")[0];
  const m = sections[2].split(",")[0];
  const a = sections[3].split(",")[0];
  const s = sections[4].split("}")[0];
  return { x: Number(x), m: Number(m), a: Number(a), s: Number(s) };
};

const readRule = (line: string): Rule => {
  if (!line.includes("<") && !line.includes(">")) {
    return () => line;
  }
  const op = line.includes("<") ? "<" : ">";
  const partKey = line.split(op)[0] as keyof Part;
  const value = Number(line.split(op)[1].split(":")[0]);
  const workFlowKey = line.split(":")[1];

  if (op === "<") {
    return (part: Part) => (part[partKey] < value ? workFlowKey : "");
  }

  return (part: Part) => (part[partKey] > value ? workFlowKey : "");
};

const readWorkflow = (lines: string[]): Workflows => {
  return lines.reduce((acc, line) => {
    const name = line.split("{")[0];
    const ruleTexts = line.split("{")[1].split("}")[0].split(",");
    const rules = ruleTexts.map(readRule);
    acc[name] = rules;
    return acc;
  }, {} as Workflows);
};

const totalRating = ({ x, m, a, s }: Part) => x + m + a + s;

const applyRules = (part: Part, rules: Rule[]): string => {
  const rule = rules.find((rule) => rule(part));
  return rule ? rule(part) : REJECTED;
};

const applyWorkflow = (
  part: Part,
  workflows: Workflows
): typeof ACCEPTED | typeof REJECTED => {
  let currentWorkflowKey = START;
  while (currentWorkflowKey !== ACCEPTED && currentWorkflowKey !== REJECTED) {
    const rules = workflows[currentWorkflowKey];
    currentWorkflowKey = applyRules(part, rules);
  }

  return currentWorkflowKey;
};

export const solveStar1 = (input: string[]) => {
  const workflows = readWorkflow(input.slice(0, input.indexOf("")));
  const parts = input.slice(input.indexOf("") + 1).map(readPart);

  const acceptedParts = parts.filter(
    (part) => applyWorkflow(part, workflows) === ACCEPTED
  );

  return acceptedParts.reduce((acc, part) => acc + totalRating(part), 0);
};

// part 2
const readRule2 = (line: string): Rule2 => {
  if (!line.includes("<") && !line.includes(">")) {
    return { wfKey: line };
  }
  const op = line.includes("<") ? "<" : ">";
  const partKey = line.split(op)[0] as keyof Part;
  const value = Number(line.split(op)[1].split(":")[0]);
  const workFlowKey = line.split(":")[1];

  return { partKey, op, wfKey: workFlowKey, value };
};

const readWorkflows2 = (lines: string[]): Workflows2 => {
  return lines.reduce((acc, line) => {
    const name = line.split("{")[0];
    const ruleTexts = line.split("{")[1].split("}")[0].split(",");
    const rules = ruleTexts.map(readRule2);
    acc[name] = rules;
    return acc;
  }, {} as Workflows2);
};

type Range = [number, number];

type PartRange = {
  x: Range;
  m: Range;
  a: Range;
  s: Range;
};

type Rule2 = {
  partKey?: keyof Part;
  op?: "<" | ">";
  value?: number;
  wfKey: string;
};

type Workflows2 = {
  [name: string]: Rule2[];
};

const fourthDimensionVolume = (range: PartRange) =>
  Object.values(range).reduce((acc, [min, max]) => acc * (max - min + 1), 1);

const intersectingRange = (range1: Range, range2: Range) => {
  const [min1, max1] = range1;
  const [min2, max2] = range2;
  if (min1 > max2 || min2 > max1) {
    return 0;
  }
  return Math.min(max1, max2) - Math.max(min1, min2) + 1;
};

const intersectingVolume = (range1: PartRange, range2: PartRange) => {
  const x = intersectingRange(range1.x, range2.x);
  const m = intersectingRange(range1.m, range2.m);
  const a = intersectingRange(range1.a, range2.a);
  const s = intersectingRange(range1.s, range2.s);
  return x * m * a * s;
};

const unionVolume = (range: PartRange[]): number => {
  const [first, ...rest] = range;
  if (rest.length === 0) {
    return fourthDimensionVolume(first);
  }

  const [second, ...rest2] = rest;
  const intersection = intersectingVolume(first, second);
  if (intersection === 0) {
    return fourthDimensionVolume(first) + unionVolume(rest);
  }

  const union =
    fourthDimensionVolume(first) + fourthDimensionVolume(second) - intersection;
  if (rest2.length === 0) {
    return union;
  }

  return union + unionVolume(rest2);
};

type State = {
  range: PartRange;
  currentWorkflowKey: string;
  ruleIndex: number;
};

export const solveStar2 = (input: string[]) => {
  const workflows = readWorkflows2(input.slice(0, input.indexOf("")));
  const min = 1;
  const max = 4000;
  const initialPartRanges: PartRange = {
    x: [min, max],
    m: [min, max],
    a: [min, max],
    s: [min, max],
  };

  const getNextStates = ({
    range,
    ruleIndex,
    currentWorkflowKey,
  }: State): State[] => {
    const { partKey, wfKey, value, op } =
      workflows[currentWorkflowKey][ruleIndex];

    if (!partKey) {
      return [{ range, currentWorkflowKey: wfKey, ruleIndex: 0 }];
    }

    if (op === "<") {
      if (range[partKey][1] < value!) {
        return [{ range, currentWorkflowKey: wfKey, ruleIndex: 0 }];
      }
      return [
        {
          range: { ...range, [partKey]: [range[partKey][0], value! - 1] },
          currentWorkflowKey: wfKey,
          ruleIndex: 0,
        },
        {
          range: { ...range, [partKey]: [value, range[partKey][1]] },
          currentWorkflowKey,
          ruleIndex: ruleIndex + 1,
        },
      ];
    }

    if (range[partKey][0] > value!) {
      return [{ range, currentWorkflowKey: wfKey, ruleIndex: 0 }];
    }
    return [
      {
        range: { ...range, [partKey]: [value! + 1, range[partKey][1]] },
        currentWorkflowKey: wfKey,
        ruleIndex: 0,
      },
      {
        range: { ...range, [partKey]: [range[partKey][0], value] },
        currentWorkflowKey,
        ruleIndex: ruleIndex + 1,
      },
    ];
  };

  let acceptedRanges: State[] = [];
  const queue: State[] = [
    { range: initialPartRanges, currentWorkflowKey: START, ruleIndex: 0 },
  ];

  while (queue.length > 0) {
    const state = queue.pop()!;
    switch (state.currentWorkflowKey) {
      case ACCEPTED:
        acceptedRanges.push(state);
        continue;
      case REJECTED:
        continue;
      default:
        queue.push(...getNextStates(state));
    }
  }

  return unionVolume(acceptedRanges.map(({ range }) => range));
};
