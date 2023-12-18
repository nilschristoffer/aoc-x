import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { ApiLeaderboard } from "./apiType";

export const useLocalStorage = <T,>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};

export type MemberPartResult = {
  time?: number;
  rank?: number;
  score?: number;
};

export type MemberDayResult = {
  part1: MemberPartResult;
  part2: MemberPartResult;
  diff: MemberPartResult;
  dayScore: number;
};

export type MemberDailyResults = {
  [day: number]: MemberDayResult;
};

export type Member = {
  id: number;
  dailyResults: MemberDailyResults;
  localScore: number;
  name?: string;
  globalScore: number;
  stars: number;
};

export type MemberScorePerDay = {
  [memberId: string]: Member;
};

export type PartScore = {
  member: { id: number; name: string };
  time_ts: number;
};

export type DayScore = {
  part1: PartScore[];
  diff: PartScore[];
  part2: PartScore[];
};

export type DailyScores = {
  [day: string]: DayScore;
};

const getDailyScores = (leaderboard: ApiLeaderboard): DailyScores => {
  const dailyScores = Array.from(Array(25).keys()).reduce((acc, day) => {
    acc[day + 1] = {
      part1: [],
      part2: [],
      diff: [],
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

const getMemberScorePerDay = (leaderboard: ApiLeaderboard) => {
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
          dayScore,
        };
      });

      return acc;
    },
    {} as MemberScorePerDay
  );

  return memberScorePerDay;
};

const AdventOfCodeContext = createContext<{
  leaderboard: ApiLeaderboard | null;
  setLeaderboard: (leaderboard: ApiLeaderboard) => void;
  dailyScores: DailyScores;
  members: Member[];
}>({
  leaderboard: null,
  setLeaderboard: () => ({}),
  dailyScores: {},
  members: [],
});

export const AdventOfCodeContextProvider: React.FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  const [leaderboard, setLeaderboard] = useLocalStorage<ApiLeaderboard | null>(
    "aoc22-leaderboard"
  );

  const memberScorePerDay = useMemo(
    () => (leaderboard ? getMemberScorePerDay(leaderboard) : {}),
    [leaderboard]
  );

  const members = Object.values(memberScorePerDay);

  members.sort((a, b) => b.localScore - a.localScore);

  const dailyScores = useMemo(
    () => (leaderboard ? getDailyScores(leaderboard) : {}),
    [leaderboard]
  );

  return (
    <AdventOfCodeContext.Provider
      value={{
        leaderboard,
        setLeaderboard,
        dailyScores,
        members,
      }}
    >
      {children}
    </AdventOfCodeContext.Provider>
  );
};

export const useAdventOfCodeJson = () => useContext(AdventOfCodeContext);
