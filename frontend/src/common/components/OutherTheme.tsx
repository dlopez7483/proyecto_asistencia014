import { createTheme } from "@mui/material";

export const OutherTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#000",
        },
        background: {
          paper: "#e5e5e5",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#FFAA00",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
