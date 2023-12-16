import { leastCommonMultiple } from "../utils/maths";

type Nodes = { [key: string]: { leftKey: string; rightKey: string } };

export const solveStar1 = (input: string[]): number => {
  const leftRightSeq = input[0].trim();

  const nodes = input.slice(2).reduce((acc, curr) => {
    const key = curr.split("=")[0].trim();
    const [left, right] = curr
      .split("=")[1]
      .split(",")
      .map((x) =>
        x.trim().replaceAll("(", "").replaceAll(" ", "").replaceAll(")", "")
      );
    acc[key] = { leftKey: left, rightKey: right };

    return acc;
  }, {} as Nodes);

  let step = 0;
  let currNodeKey = "AAA";

  while (currNodeKey !== "ZZZ") {
    const currNode = nodes[currNodeKey];
    const nextIndex = leftRightSeq[step % leftRightSeq.length];
    currNodeKey = nextIndex === "L" ? currNode.leftKey : currNode.rightKey;
    step++;
  }

  return step;
};

const isStartNode = (nodeKey: string) => nodeKey.endsWith("A");
const isEndNode = (nodeKey: string) => nodeKey.endsWith("Z");

export const solveStar2 = (input: string[]) => {
  const leftRightSeq = input[0].trim();

  const nodes = input.slice(2).reduce((acc, curr) => {
    const key = curr.split("=")[0].trim();
    const [leftKey, rightKey] = curr
      .split("=")[1]
      .split(",")
      .map((x) =>
        x.trim().replaceAll("(", "").replaceAll(" ", "").replaceAll(")", "")
      );
    acc[key] = { leftKey, rightKey };

    return acc;
  }, {} as Nodes);

  const calculateDistanceToEndNode = (nodeKey: string) => {
    let step = 0;
    let currNodeKey = nodeKey;
    while (!isEndNode(currNodeKey)) {
      const currNode = nodes[currNodeKey];
      currNodeKey =
        leftRightSeq[step % leftRightSeq.length] === "L"
          ? currNode.leftKey
          : currNode.rightKey;
      step++;
    }
    return step;
  };

  const startNodeKeys = Object.keys(nodes).filter(isStartNode);
  const startToEndDistances = startNodeKeys.map(calculateDistanceToEndNode);

  return leastCommonMultiple(startToEndDistances);
};
