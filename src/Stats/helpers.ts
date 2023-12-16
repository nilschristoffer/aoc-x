import { ApiLeaderboard, ApiMember } from "./apiType";

export const localTimeFromSeconds = (seconds: number, day: string) => {
  const date = new Date(seconds * 1000);
  const isSameDay = date.getDate().toString() === day;
  return isSameDay ? date.toLocaleTimeString() : date.toLocaleString();
};

export const lengthInTimeFromSeconds = (timeInSeconds: number) => {
  const milliseocnds = timeInSeconds * 1000;
  const days = Math.floor(milliseocnds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (milliseocnds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((milliseocnds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseocnds % (1000 * 60)) / 1000);

  const daysString = days > 0 ? `${days}d ` : "";
  const hoursString = hours > 0 ? `${hours}h ` : "";
  const minutesString = minutes > 0 ? `${minutes}m ` : "";
  const secondsString = seconds > 0 ? `${seconds}s ` : "";

  return `${daysString}${hoursString}${minutesString}${secondsString}`;
};

export const fastestFirstStar =
  (day: number) => (a: ApiMember, b: ApiMember) => {
    const aFirstStar = a.completion_day_level[day.toString()]?.[1]?.get_star_ts;
    const bFirstStar = b.completion_day_level[day.toString()]?.[1]?.get_star_ts;

    if (aFirstStar && bFirstStar) {
      return aFirstStar - bFirstStar;
    }

    if (aFirstStar) {
      return -1;
    }

    if (bFirstStar) {
      return 1;
    }

    return 0;
  };

export const fastestSecondStar =
  (day: number) => (a: ApiMember, b: ApiMember) => {
    const aSecondStar =
      a.completion_day_level[day.toString()]?.[2]?.get_star_ts;
    const bSecondStar =
      b.completion_day_level[day.toString()]?.[2]?.get_star_ts;

    if (aSecondStar && bSecondStar) {
      return aSecondStar - bSecondStar;
    }

    if (aSecondStar) {
      return -1;
    }

    if (bSecondStar) {
      return 1;
    }

    return 0;
  };

export const fastestFromFirstStarToSecondsStar =
  (day: number) => (a: ApiMember, b: ApiMember) => {
    const aTime = timeFromFirstStarToSecondStar(day)(a);
    const bTime = timeFromFirstStarToSecondStar(day)(b);

    if (aTime && bTime) {
      return aTime - bTime;
    }

    if (aTime) {
      return -1;
    }
    if (bTime) {
      return 1;
    }
    return 0;
  };

export const mostStars = (a: ApiMember, b: ApiMember) => {
  return b.stars - a.stars;
};

export const mostLocalScore = (a: ApiMember, b: ApiMember) => {
  return b.local_score - a.local_score;
};

export const mostGlobalScore = (a: ApiMember, b: ApiMember) => {
  return b.global_score - a.global_score;
};

export const timeFromFirstStarToSecondStar =
  (day: number) => (a: ApiMember) => {
    const aFirstStar = a.completion_day_level[day.toString()]?.[1]?.get_star_ts;
    const aSecondStar =
      a.completion_day_level[day.toString()]?.[2]?.get_star_ts;

    if (aFirstStar && aSecondStar) {
      return aSecondStar - aFirstStar;
    }
  };

export const lastDayCompleted = (members: ApiLeaderboard["members"]) => {
  const days = Object.values(members).map((member) => {
    const days = Object.keys(member.completion_day_level).map((day) =>
      parseInt(day)
    );
    return Math.max(...days);
  });
  return Math.max(...days);
};

const hasCompletedStar = (member: ApiMember, day: number, part: number) => {
  return member.completion_day_level[day.toString()]?.[part]?.get_star_ts;
};

export const scoreByDay = (
  members: ApiLeaderboard["members"],
  day: number,
  member: ApiMember
) => {
  const allMembers = Object.values(members);
  const firstStarOrder = [...allMembers].sort(fastestFirstStar(day));
  const secondStar = [...allMembers].sort(fastestSecondStar(day));

  const hasCompletedFirstStar = hasCompletedStar(member, day, 1);
  const hasCompletedSecondStar = hasCompletedStar(member, day, 2);

  const firstStarPoints = hasCompletedFirstStar
    ? firstStarOrder.reverse().indexOf(member) + 1
    : 0;
  const secondStarPoints = hasCompletedSecondStar
    ? secondStar.reverse().indexOf(member) + 1
    : 0;

  return {
    firstStarPoints,
    secondStarPoints,
  };
};

export const membersWithScorePerDay = (
  members: ApiLeaderboard["members"]
): { member: ApiMember; scores: number[] }[] => {
  const lastDay = lastDayCompleted(members);
  return Object.values(members).map((member) => {
    const scores = [];
    for (let day = 1; day <= lastDay; day++) {
      const { firstStarPoints, secondStarPoints } = scoreByDay(
        members,
        day,
        member
      );
      scores.push(firstStarPoints + secondStarPoints);
    }
    return { member, scores };
  });
};

export const membersWithAccumulatedScorePerDayWithRank = (
  members: ApiLeaderboard["members"]
) => {
  const membersWithScore = membersWithScorePerDay(members);
  const membersWithAccumulatedScore = membersWithScore.map(
    ({ member, scores }) => {
      const accumulatedScores = scores.reduce((acc, score, index) => {
        const previousScore = acc[index - 1] || 0;
        return [...acc, score + previousScore];
      }, [] as number[]);
      return { member, accumulatedScores };
    }
  );
  const membersWithAccumulatedScoreAndRank = membersWithAccumulatedScore.map(
    ({ member, accumulatedScores }) => {
      const rank = membersWithAccumulatedScore.reduce(
        (
          acc,
          { member: otherMember, accumulatedScores: otherAccumulatedScores }
        ) => {
          if (member.id === otherMember.id) {
            return acc;
          }
          const isBetter = otherAccumulatedScores.every((score, index) => {
            return score >= accumulatedScores[index];
          });
          return isBetter ? acc + 1 : acc;
        },
        1
      );
      return { member, accumulatedScores, rank };
    }
  );
  return membersWithAccumulatedScoreAndRank;
};
