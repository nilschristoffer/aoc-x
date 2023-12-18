import { IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ScoreTable from "./ScoreTable";

import { PartScore } from "../AdventOfCodeContext";
import { ExpandMore } from "@mui/icons-material";

interface IProps {
  data: PartScore[];
  timeConverter?: (time_ts: number) => string;
  heading: React.ReactNode;
}

const DailyTable = ({ data, timeConverter, heading }: IProps) => {
  const [top, setTop] = React.useState(10);

  const topMembers = data.slice(0, top);

  return (
    <Paper sx={{ p: 1 }} variant="outlined">
      <Stack spacing={1} alignItems="center">
        <Typography>{heading}</Typography>
        <ScoreTable data={topMembers} timeConverter={timeConverter} />
        <IconButton
          onClick={() => setTop((prev) => prev + 10)}
          disabled={top >= data.length}
        >
          <ExpandMore />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default DailyTable;
