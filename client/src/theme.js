import { createTheme } from "@mui/material";

// Material UI theme overrides
export const theme = createTheme({
  palette: {
    background: {
      default: "#ecf0f1",
      paper: "#ecf0f1",
    },
    primary: {
      main: "#3498db",
      dark: "#2980b9",
    },
    secondary: {
      main: "#16a085",
    },
    text: {
      primary: "#3a3a3a",
      light: "#6a6a6a",
      extralight: "#b5b5b5",
      white: "#fafafa",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          color: "#3a3a3a",
        },
      },
    },
  },
});
