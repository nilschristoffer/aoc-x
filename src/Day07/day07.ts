const cardLabelsPart1 = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

export const solveStar1 = (input: string[]) => {
  const hands: Hand[] = input.map(readRow());
  hands.sort(sortByHandType());
  return hands.reduce(
    (acc, curr, idx) => acc + curr.bid * (hands.length - idx),
    0
  );
};

const joker = "J";

const cardLabelsPart2 = [
  joker,
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

type Hand = {
  hand: string[];
  bid: number;
  typeIndex: number;
};

const readRow =
  ({ wildCard }: { wildCard?: string } = {}) =>
  (row: string): Hand => {
    const [hand, bid] = row.split(" ");
    const handArr = hand.split("");
    return {
      hand: handArr,
      bid: Number(bid),
      typeIndex: handTypes.findIndex((type) => type(handArr, wildCard)),
    };
  };

type IsHandType = (hand: string[], wildCard?: string) => boolean;

const isFiveOfAKind: IsHandType = (hand, wildCard) =>
  hand.some(
    (card) => hand.filter((c) => [wildCard, card].includes(c)).length === 5
  );

const isFourOfAKind: IsHandType = (hand, wildCard) =>
  hand.some(
    (card) => hand.filter((c) => [wildCard, card].includes(c)).length === 4
  );

const isFullHouse: IsHandType = (hand, wildCard) => {
  const hasPart1FullHouse =
    hand.some((card) => hand.filter((c) => c === card).length === 3) &&
    hand.some((card) => hand.filter((c) => c === card).length === 2);
  return (
    hasPart1FullHouse ||
    (!!wildCard &&
      isTwoPairs(hand) &&
      hand.filter((c) => c === wildCard).length === 1)
  );
};

const isThreeOfAKind: IsHandType = (hand, wildCard) =>
  hand.some(
    (card) => hand.filter((c) => [wildCard, card].includes(c)).length === 3
  );

const isTwoPairs: IsHandType = (hand) =>
  hand.filter((card) => hand.filter((c) => c === card).length === 2).length ===
  4;

const isPair: IsHandType = (hand, wildCard) =>
  hand.some(
    (card) => hand.filter((c) => [wildCard, card].includes(c)).length === 2
  );

const isDistinct: IsHandType = () => true;

const handTypes = [
  isFiveOfAKind,
  isFourOfAKind,
  isFullHouse,
  isThreeOfAKind,
  isTwoPairs,
  isPair,
  isDistinct,
];

const sortByHandType =
  (part2 = false) =>
  (hand1: Hand, hand2: Hand) => {
    const cardLables = part2 ? cardLabelsPart2 : cardLabelsPart1;

    if (hand1.typeIndex === hand2.typeIndex) {
      for (let i = 0; i < hand1.hand.length; i++) {
        if (hand1.hand[i] !== hand2.hand[i]) {
          return (
            cardLables.indexOf(hand2.hand[i]) -
            cardLables.indexOf(hand1.hand[i])
          );
        }
      }
      return 0;
    }
    return hand1.typeIndex - hand2.typeIndex;
  };

export const solveStar2 = (input: string[]) => {
  const hands: Hand[] = input.map(readRow({ wildCard: joker }));
  hands.sort(sortByHandType(true));
  return hands.reduce(
    (acc, curr, idx) => acc + curr.bid * (hands.length - idx),
    0
  );
};
