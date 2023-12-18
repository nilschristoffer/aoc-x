import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    // darkMode
    mode: "dark",
    primary: {
      main: "#ffff66",
    },
    secondary: {
      main: "#009900",
    },
    background: {
      default: "#0f0f23",
      paper: "#0f0f23",
    },
    text: {
      primary: "#ccc",
      secondary: "#ccc",
    },
  },
  typography: {
    fontFamily: ["Source Code Pro", "monospace"].join(","),
  },
  shape: {
    borderRadius: 0,
  },
});
