import { Container, ThemeProvider, CssBaseline } from "@mui/material";

import { theme } from "./Stats/theme";
import { AdventOfCodeContextProvider } from "./Stats/AdventOfCodeContext";
import { Provider } from "react-redux";
import { store } from "./Stats/store";

import Home from "./Stats/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <AdventOfCodeContextProvider>
          <Container maxWidth="xl" sx={{ my: 2 }}>
            <Home />
          </Container>
        </AdventOfCodeContextProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
