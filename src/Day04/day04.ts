const getNumbers = (input: string): [string[], string[]] => {
  const [winningNumbers, ticketNumbers] = input.split(":")[1].split("|");
  return [
    winningNumbers.split(" ").filter((str) => str.trim() !== ""),
    ticketNumbers.split(" ").filter((str) => str.trim() !== ""),
  ];
};

export const solve1Star = (input: string[]) => {
  let sum = 0;
  input.forEach((card) => {
    const [winningNumbers, ticketNumbers] = getNumbers(card);
    const winningTicketNumbers = ticketNumbers.filter((num) =>
      winningNumbers.includes(num)
    );
    if (winningTicketNumbers.length > 0) {
      sum += Math.pow(2, winningTicketNumbers.length - 1);
    }
  });
  return sum;
};

const getCards = (input: string[]) =>
  input.map((card) => {
    const [winningNumbers, ticketNumbers] = getNumbers(card);
    return {
      points: ticketNumbers.filter((num) => winningNumbers.includes(num))
        .length,
      count: 1,
    };
  });

export const solve2Star = (input: string[]) => {
  const cards = getCards(input);
  cards.forEach((card, index) => {
    if (card.points > 0) {
      cards.slice(index + 1, index + 1 + card.points).forEach((nextCard) => {
        nextCard.count += card.count;
      });
    }
  });

  return cards.reduce((acc, card) => acc + card.count, 0);
};
