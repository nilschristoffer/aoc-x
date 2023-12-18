import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { ApiLeaderboard } from "./apiType";
import { useLocalStorage } from "./useLocalStorage";
import { getDailyScores, getMemberScorePerDay } from "./helpers";

export type MemberPartResult = {
  time?: number;
  rank?: number;
  score?: number;
};

export type MemberDayResult = {
  part1: MemberPartResult;
  part2: MemberPartResult;
  diff: MemberPartResult;
  releaseDate: Date;
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
  releaseDate: Date;
};

export type DailyScores = {
  [day: string]: DayScore;
};

const AdventOfCodeContext = createContext<{
  leaderboard: ApiLeaderboard | null;
  setLeaderboard: (leaderboard: ApiLeaderboard) => void;
  dailyScores: DailyScores;
  members: Member[];
  year?: number;
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
    "aoc-private-leaderboard-stats"
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

  const year = leaderboard?.event ? Number(leaderboard?.event) : undefined;

  return (
    <AdventOfCodeContext.Provider
      value={{
        leaderboard,
        setLeaderboard,
        dailyScores,
        members,
        year,
      }}
    >
      {children}
    </AdventOfCodeContext.Provider>
  );
};

export const useAdventOfCodeJson = () => useContext(AdventOfCodeContext);
