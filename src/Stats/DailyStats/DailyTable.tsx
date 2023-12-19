import { IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ScoreTable from "./ScoreTable";

import { PartScore } from "../AdventOfCodeContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

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
        <Stack direction="row" spacing={0} alignItems="center">
          <IconButton
            onClick={() => setTop((prev) => prev + 10)}
            disabled={top >= data.length}
            color="secondary"
          >
            <ExpandMore />
          </IconButton>
          <IconButton
            onClick={() => setTop(10)}
            disabled={top <= 10}
            color="secondary"
          >
            <ExpandLess />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DailyTable;
