import React from "react";
import { useAdventOfCodeJson } from "../AdventOfCodeContext";
import DayStats from "./DayStats";
import { Stack, Typography } from "@mui/material";

const AllDayStats: React.FunctionComponent = () => {
  const { dailyScores, year } = useAdventOfCodeJson();

  if (!dailyScores || !Object.keys(dailyScores).length) {
    return <p>Ingen data...</p>;
  }
  const allDays = Array.from(Array(25).keys()).map((day) => day + 1);

  return (
    <Stack>
      <Typography gutterBottom>{year}</Typography>
      {allDays.map((day) => (
        <DayStats key={day} day={day.toString()} dayScore={dailyScores[day]} />
      ))}
    </Stack>
  );
};

export default AllDayStats;
