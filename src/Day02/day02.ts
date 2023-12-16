type BallColor = "red" | "green" | "blue";

type BallSet = {
  color: BallColor;
  quantity: number;
}[];

type Game = {
  sets: BallSet[];
  id: number;
};

const parseGame = (str: string): Game => {
  const [gameStr, setStr] = str.split(":");
  const id = parseInt(gameStr.split(" ")[1], 10);
  const sets = setStr.split(";").map((set) => {
    const ballSets = set.split(",").map((ballSet) => {
      const [quantity, color] = ballSet.trim().split(" ");
      return {
        color: color as BallColor,
        quantity: parseInt(quantity, 10),
      };
    });
    return ballSets;
  });
  return {
    id,
    sets,
  };
};

const parseInput = (input: string[]): Game[] => input.map(parseGame);

type Limit = {
  [key in BallColor]: number;
};

const isPossible = (game: Game, limit: Limit): boolean =>
  game.sets.every((set) =>
    set.every((ballSet) => ballSet.quantity <= limit[ballSet.color])
  );

export const solve1Star = (input: string[]): number => {
  const games = parseInput(input);
  const limit: Limit = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const possibleGames = games.filter((game) => isPossible(game, limit));
  return possibleGames.map((game) => game.id).reduce((acc, id) => acc + id, 0);
};

const power = (game: Game): number => {
  const max: Limit = {
    red: 0,
    green: 0,
    blue: 0,
  };

  game.sets.forEach((set) => {
    set.forEach((ballSet) => {
      if (ballSet.quantity > max[ballSet.color]) {
        max[ballSet.color] = ballSet.quantity;
      }
    });
  });

  return max.red * max.green * max.blue;
};

export const solve2Star = (input: string[]): number => {
  const games = parseInput(input);
  const gamePower = games.map(power);
  return gamePower.reduce((acc, power) => acc + power, 0);
};
