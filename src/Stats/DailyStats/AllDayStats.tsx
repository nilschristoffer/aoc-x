import React from "react";
import { useAdventOfCodeJson } from "../AdventOfCodeContext";
import DayStats from "./DayStats";
import { Table, TableContainer } from "@mui/material";

const AllDayStats: React.FunctionComponent = () => {
  const { dailyScores } = useAdventOfCodeJson();

  if (!dailyScores || !Object.keys(dailyScores).length) {
    return <p>No data found...</p>;
  }
  const allDays = Array.from(Array(25).keys()).map((day) => day + 1);

  return (
    <TableContainer>
      <Table>
        {allDays.map((day) => (
          <DayStats
            key={day}
            day={day.toString()}
            dayScore={dailyScores[day]}
          />
        ))}
      </Table>
    </TableContainer>
  );
};

export default AllDayStats;
