import {
  Container,
  Tabs,
  Tab,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import React from "react";
import "./App.css";
import AllDayStats from "./Stats/DailyStats/AllDayStats";
import Leaderboard from "./Stats/Leaderboard/Leaderboard";
import { theme } from "./Stats/theme";
import DataModal from "./Stats/DataModal/DataModal";
import { AdventOfCodeContextProvider } from "./Stats/useLocalStorage";
import { Provider } from "react-redux";
import { store } from "./Stats/store";

function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <AdventOfCodeContextProvider>
          <Container maxWidth="lg">
            <DataModal />
            <Tabs value={tab}>
              <Tab value={0} label="Leaderboard" onClick={() => setTab(0)} />
              <Tab value={1} label="Daily stats" onClick={() => setTab(1)} />
            </Tabs>
            {tab === 0 && <Leaderboard />}
            {tab === 1 && <AllDayStats />}
          </Container>
        </AdventOfCodeContextProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
