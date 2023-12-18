import React, { useRef } from "react";
import DataModal from "./DataModal/DataModal";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { CalendarTodaySharp, LeaderboardSharp } from "@mui/icons-material";
import Leaderboard from "./Leaderboard/Leaderboard";
import AllDayStats from "./DailyStats/AllDayStats";

const Home: React.FunctionComponent = () => {
  const containerRef = useRef(null);
  const [tab, setTab] = React.useState(0);

  return (
    <Stack component={Box} spacing={2} ref={containerRef}>
      <Typography variant="h3" component="h1">
        Advent of Code
      </Typography>
      <Typography variant="subtitle1" component="p">
        Extended private leaderbaord stats
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Tabs value={tab}>
          <Tab
            value={0}
            label="Leaderboard"
            onClick={() => setTab(0)}
            icon={<LeaderboardSharp />}
            iconPosition="start"
          />
          <Tab
            value={1}
            label="Days"
            onClick={() => setTab(1)}
            icon={<CalendarTodaySharp />}
            iconPosition="start"
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
