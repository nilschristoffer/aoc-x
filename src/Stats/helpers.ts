import { DailyScores, MemberScorePerDay } from "./AdventOfCodeContext";
import { ApiLeaderboard } from "./apiType";

export const localTimeFromSeconds = (seconds: number, referenceDate: Date) => {
  const date = new Date(seconds * 1000);
  const daysAfter = Math.floor(
    (date.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return (daysAfter > 0 ? ` +${daysAfter}d:` : "") + date.toLocaleTimeString();
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

export const getMemberScorePerDay = (leaderboard: ApiLeaderboard) => {
  const dailyScores = getDailyScores(leaderboard);
  const numberOfMembers = Object.keys(leaderboard.members).length;
  const memberScorePerDay = Object.values(leaderboard.members).reduce(
    (acc, member) => {
      acc[member.id] = {
        id: member.id,
        globalScore: member.global_score,
        localScore: member.local_score,
        name: member.name ?? `Anonymous ${member.id}`,
        stars: member.stars,
        dailyResults: {},
      };

      Object.keys(member.completion_day_level).forEach((day: string) => {
        const dayData = member.completion_day_level[day];
        const part1 = dayData["1"];
        const part2 = dayData["2"];

        const part1Time = part1?.get_star_ts;
        const part2Time = part2?.get_star_ts;

        const part1Rank = dailyScores[day].part1.findIndex(
          (score) => score.member.id === member.id
        );
        const part2Rank = dailyScores[day].part2.findIndex(
          (score) => score.member.id === member.id
        );

        const diffRank = dailyScores[day].diff.findIndex(
          (score) => score.member.id === member.id
        );

        const part1Score = part1Rank === -1 ? 0 : numberOfMembers - part1Rank;
        const part2Score = part2Rank === -1 ? 0 : numberOfMembers - part2Rank;

        const dayScore = part1Score + part2Score;

        acc[member.id].dailyResults[Number(day)] = {
          part1: {
            time: part1Time,
            rank: part1Rank > -1 ? part1Rank + 1 : undefined,
            score: part1Score,
          },
          part2: {
            time: part2Time,
            rank: part2Rank > -1 ? part2Rank + 1 : undefined,
            score: part2Score,
          },
          diff: {
            time: part2Time && part1Time ? part2Time - part1Time : undefined,
            rank: diffRank > -1 ? diffRank + 1 : undefined,
          },
          releaseDate: new Date(
            Number(leaderboard.event),
            11,
            Number(day),
            5,
            0,
            0,
            0
          ),
          dayScore,
        };
      });

      return acc;
    },
    {} as MemberScorePerDay
  );

  return memberScorePerDay;
};

export const getDailyScores = (leaderboard: ApiLeaderboard): DailyScores => {
  const dailyScores = Array.from(Array(25).keys()).reduce((acc, day) => {
    acc[day + 1] = {
      part1: [],
      part2: [],
      diff: [],
      releaseDate: new Date(Number(leaderboard.event), 11, day + 1, 5, 0, 0, 0),
    };
    return acc;
  }, {} as DailyScores);

  Object.values(leaderboard.members).forEach((member) => {
    Object.keys(member.completion_day_level).forEach((day) => {
      const dayData = member.completion_day_level[day];
      const part1 = dayData["1"];
      const part2 = dayData["2"];

      if (part1?.get_star_ts) {
        dailyScores[parseInt(day)].part1.push({
          member: {
            id: member.id,
            name: member.name ?? `Anonymous ${member.id}`,
          },
          time_ts: part1.get_star_ts,
        });
      }

      if (part2?.get_star_ts) {
        dailyScores[parseInt(day)].part2.push({
          member: {
            id: member.id,
            name: member.name ?? `Anonymous ${member.id}`,
          },
          time_ts: part2.get_star_ts,
        });
      }

      if (part1?.get_star_ts && part2?.get_star_ts) {
        dailyScores[parseInt(day)].diff.push({
          member: {
            id: member.id,
            name: member.name ?? `Anonymous ${member.id}`,
          },
          time_ts: part2.get_star_ts - part1.get_star_ts,
        });
      }
    });
  });

  Object.keys(dailyScores).forEach((day) => {
    dailyScores[day].part1.sort((a, b) => a.time_ts - b.time_ts);
    dailyScores[day].part2.sort((a, b) => a.time_ts - b.time_ts);
    dailyScores[day].diff.sort((a, b) => a.time_ts - b.time_ts);
  });

  return dailyScores;
};

export const getOrderSuffix = (order: number) => {
  if (order === 11) return order + "th";
  if (order === 12) return order + "th";
  if (order === 13) return order + "th";
  if (order % 10 === 1) return order + "st";
  if (order % 10 === 2) return order + "nd";
  if (order % 10 === 3) return order + "rd";

  return order + "th";
};
