import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const InnerTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[500],
        },
        background: {
          paper: "#fff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: blue[500],
        },
      },
    },
  },
});
