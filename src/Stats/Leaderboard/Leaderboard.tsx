import { Stack } from "@mui/material";
import React from "react";
import {
  lastDayCompleted,
  lengthInTimeFromSeconds,
  localTimeFromSeconds,
  membersWithAccumulatedScorePerDayWithRank,
} from "../helpers";

import { useAdventOfCodeJson } from "../useLocalStorage";
import MemberCard from "./MemberCard";
import PointsChart from "./PointsChart";

type DailyStatsRow = {
  day: number;
  timeStampDay1: string;
  timeStampDay2: string;
  delta: string;
  pointsDay1: number;
  pointsDay2: number;
  totalPoints: number;
  accumulativePoints: number;
  accumulativePointsRank: number;
};

const Leaderboard: React.FunctionComponent = () => {
  const { leaderboard } = useAdventOfCodeJson();

  if (!leaderboard?.members) {
    return null;
  }

  const memberIds = Object.keys(leaderboard.members);
  const members = memberIds.map((id) => leaderboard.members[id]);
  members.sort((a, b) => b.local_score - a.local_score);

  return (
    <Stack spacing={0}>
      {members.map((member, index) => (
        <MemberCard key={member.id} member={member} rank={index + 1} />
      ))}
      <PointsChart />
    </Stack>
  );
};

export default Leaderboard;
