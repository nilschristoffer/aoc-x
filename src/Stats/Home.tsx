import React, { useRef } from "react";
import DataModal from "./DataModal/DataModal";
import {
  Alert,
  Box,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { LeaderboardSharp, TodaySharp } from "@mui/icons-material";
import Leaderboard from "./Leaderboard/Leaderboard";
import AllDayStats from "./DailyStats/AllDayStats";
import { useAdventOfCodeJson } from "./AdventOfCodeContext";

const HighlightedText = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.light,
  textShadow: `0 0 5px`,
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.secondary.main,
  "&.Mui-selected": {
    color: theme.palette.secondary.light,
    textShadow: `0 0 5px`,
    "& svg": {
      filter: `drop-shadow(0 0 5px ${theme.palette.secondary.light})`,
    },
  },
}));

const Home: React.FunctionComponent = () => {
  const containerRef = useRef(null);
  const [tab, setTab] = React.useState(0);
  const { owner, year } = useAdventOfCodeJson();

  return (
    <Stack component={Box} spacing={2} ref={containerRef}>
      <Typography variant="h3" component="h1">
        <HighlightedText>Advent of Code</HighlightedText>
      </Typography>

      <Typography variant="subtitle1" component="p">
        This is a tool to get more stats from your private leaderboard.
      </Typography>

      {owner && year && (
        <Alert
          severity="success"
          variant="outlined"
          sx={{
            maxWidth: (theme) => theme.breakpoints.values.md,
            alignItems: "center",
            borderColor: "secondary.light",
            boxShadow: (theme) => `0 0 5px ${theme.palette.secondary.light}`,
            "& .MuiAlert-icon": {
              color: "secondary.light",
              filter: `drop-shadow(0 0 5px)`,
            },
          }}
        >
          You have successfully loaded the private leaderboard for{" "}
          <HighlightedText>{year}</HighlightedText>, created by{" "}
          <HighlightedText>{owner.name}</HighlightedText>. You can find the
          imported JSON{" "}
          <Link
            href={`https://adventofcode.com/${year}/leaderboard/private/view/${owner.memberId}.json`}
            color="secondary"
            target="_blank"
          >
            <HighlightedText>here</HighlightedText>
          </Link>
          .
        </Alert>
      )}

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Tabs value={tab} textColor="secondary" indicatorColor="secondary">
          <CustomTab
            value={0}
            label="Leaderboard"
            onClick={() => setTab(0)}
            icon={<LeaderboardSharp />}
            iconPosition="start"
            disableRipple
          />
          <CustomTab
            value={1}
            label="Days"
            onClick={() => setTab(1)}
            icon={<TodaySharp />}
            iconPosition="start"
            disableRipple
          />
        </Tabs>
        <DataModal />
      </Stack>
      {tab === 0 && <Leaderboard />}
      {tab === 1 && <AllDayStats />}
    </Stack>
  );
};
export default Home;
