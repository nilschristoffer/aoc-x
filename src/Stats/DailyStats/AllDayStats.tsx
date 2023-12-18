import React from "react";
import { useAdventOfCodeJson } from "../AdventOfCodeContext";
import DayStats from "./DayStats";
import { Stack } from "@mui/material";

const AllDayStats: React.FunctionComponent = () => {
  const { dailyScores } = useAdventOfCodeJson();

  if (!dailyScores) {
    return <p>Kan inte ladda leaderboard</p>;
  }
  const allDays = Array.from(Array(25).keys()).map((day) => day + 1);

  return (
    <Stack>
      {allDays.map((day) => (
        <DayStats key={day} day={day.toString()} dayScore={dailyScores[day]} />
      ))}
    </Stack>
  );
};

export default AllDayStats;
