import React from "react";
import { lastDayCompleted } from "../helpers";
import { useAdventOfCodeJson } from "../useLocalStorage";
import DayStats from "./DayStats";

const AllDayStats: React.FunctionComponent = () => {
  const { leaderboard } = useAdventOfCodeJson();

  if (!leaderboard?.members) {
    return <p>Kan inte ladda leaderboard</p>;
  }

  const lastDay = lastDayCompleted(leaderboard.members);
  const allDays = Array.from(Array(lastDay).keys()).map((day) => day + 1);
  return (
    <>
      {allDays.map((day) => (
        <DayStats key={day} day={day} />
      ))}
    </>
  );
};

export default AllDayStats;
