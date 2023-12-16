import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { ApiMember } from "../apiType";
import ScoreTable, { ScoreBoardType } from "./ScoreTable";

import { useAdventOfCodeJson } from "../useLocalStorage";

interface IProps<MappedType> {
  heading: React.ReactNode;
  day: number;
  sort: (day: number) => (a: ApiMember, b: ApiMember) => number;
  map: (member: ApiMember, index: number) => MappedType;
  top?: number;
  tableHeaders: { [key in keyof MappedType]: string };
  tableHeaderOrder: (keyof MappedType)[];
}

const DailyTable = <T extends ScoreBoardType>({
  day,
  sort,
  map,
  heading,
  top = 10,
  tableHeaderOrder,
  tableHeaders,
}: IProps<T>) => {
  const { leaderboard } = useAdventOfCodeJson();

  if (!leaderboard?.members) {
    return null;
  }

  const membersList = Object.values(leaderboard.members) as ApiMember[];

  const topMembers = [...membersList].sort(sort(day)).slice(0, top).map(map);

  return (
    <Paper sx={{ p: 1 }}>
      <Stack spacing={1}>
        <Typography variant="h6">{heading}</Typography>
        <ScoreTable
          data={topMembers}
          headerOrder={tableHeaderOrder}
          headers={tableHeaders}
        />
      </Stack>
    </Paper>
  );
};

export default DailyTable;
