import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    // darkMode
    mode: "dark",
    primary: {
      main: "#ffff66",
    },
    secondary: {
      light: "#00cc00",
      main: "#009900",
      dark: "#006600",
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
    fontFamily: ["Source Code Pro"].join(","),
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: "transparent !important",
            textShadow: "0 0 5px",
            "& svg": {
              filter: "drop-shadow(0 0 5px)",
            },
          },
        },
      },
    },
  },
});
