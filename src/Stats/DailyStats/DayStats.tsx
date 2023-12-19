import {
  Collapse,
  Grid,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import React from "react";
import { lengthInTimeFromSeconds, localTimeFromSeconds } from "../helpers";
import DailyTable from "./DailyTable";
import { DayScore } from "../AdventOfCodeContext";

interface IProps {
  day: string;
  dayScore: DayScore;
}

const DayStats: React.FC<IProps> = ({ dayScore, day }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const countPart2Completions = dayScore?.part2.map((p) => p.member.name);
  const countOnlyPart1Completions = dayScore?.part1
    .filter(
      (p) => !dayScore.part2.map((p) => p.member.id).includes(p.member.id)
    )
    .map((p) => p.member.name);

  return (
    <>
      <TableRow
        onClick={handleClick}
        sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}
      >
        <TableCell>
          <Typography sx={{ minWidth: 60 }}>Day {day}</Typography>
        </TableCell>
        <TableCell align="left">
          <Stack direction="row" spacing={0} flexWrap="wrap">
            {countPart2Completions.map((i) => (
              <Tooltip key={i} title={i}>
                <Star fontSize="small" color="primary" />
              </Tooltip>
            ))}
            {countOnlyPart1Completions.map((i) => (
              <Tooltip key={i} title={i}>
                <Star fontSize="small" color="inherit" />
              </Tooltip>
            ))}
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={2} sx={{ pt: 0, pb: isExpanded ? 2 : 0 }}>
          <Collapse in={isExpanded} timeout="auto" mountOnEnter unmountOnExit>
            <Grid
              container
              columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}
              spacing={2}
              direction={{ md: "row" }}
            >
              <Grid item xs={1}>
                <DailyTable
                  data={dayScore.part1}
                  timeConverter={(t) =>
                    localTimeFromSeconds(t, dayScore.releaseDate)
                  }
                  heading={
                    <>
                      <Star color="primary" />
                      <StarBorder color="primary" />
                    </>
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <DailyTable
                  data={dayScore.diff}
                  timeConverter={(t) => lengthInTimeFromSeconds(t)}
                  heading={
                    <>
                      <StarBorder color="primary" />
                      <Star color="primary" />
                    </>
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <DailyTable
                  data={dayScore.part2}
                  timeConverter={(t) =>
                    localTimeFromSeconds(t, dayScore.releaseDate)
                  }
                  heading={
                    <>
                      <Star color="primary" />
                      <Star color="primary" />
                    </>
                  }
                />
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DayStats;
