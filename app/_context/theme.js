import { createTheme } from "@mui/material";
import { grey, blueGrey } from "@mui/material/colors";
import darkScrollbar from "@mui/material/darkScrollbar";

const lightPalleteColors = {
  primary: {
    main: "#2962ff",
    light: "#5381ff",
    dark: "#1c44b2",
    contrastText: "#fff",
  },
  error: {
    main: "#f23645",
    light: "#f45e6a",
    dark: "#a92530",
    contrastText: "#fff",
  },
  success: {
    main: "#00A25B",
    light: "#33b47b",
    dark: "#00713f",
    contrastText: "#fff",
  },
  secondary: {
    main: "#00A25B",
    light: "#33b47b",
    dark: "#00713f",
    contrastText: "#fff",
  },
};
const darkPalleteColors = {
  primary: {
    main: "#5381ff",
    light: "#759aff",
    dark: "#3a5ab2",
    contrastText: "#fff",
  },
  error: {
    main: "#f23645",
    light: "#f45e6a",
    dark: "#a92530",
    contrastText: "#fff",
  },
  success: {
    main: "#00A25B",
    light: "#33b47b",
    dark: "#00713f",
    contrastText: "#fff",
  },
  secondary: {
    main: "#00A25B",
    light: "#33b47b",
    dark: "#00713f",
    contrastText: "#fff",
  },
};

const defaultSettings = {
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    body1: {
      fontSize: ".875rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === "dark" ? darkScrollbar() : null,
      }),
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...lightPalleteColors,
    secondaryBackground: "#f5f7fa",
    priceCardBgColor: "#ffffff",
    searchCardBgColor: "#ffffff",
    appCardBgColor: "#f0f7fa",
    financePageBgcolor: "#f0f3f580",
    financeCardTitlecolor: "#f1f1f1",
    chartGridColor: "#eeeeee",
    overviewHeader: "#e0e0e0",
    stipedTableEvenRow: "#f0f3f54d",
    appbarBorderBottom: "#e0e0e0",
    financeInfoCard: "#f5f7fa",
  },
  ...defaultSettings,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...darkPalleteColors,
    secondaryBackground: "#101010",
    priceCardBgColor: "#212121",
    searchCardBgColor: "#282828",
    appCardBgColor: "#252525",
    financePageBgcolor: "#191919B3", // 70% -> B3
    financeCardTitlecolor: "#252529",
    chartGridColor: "#494949",
    overviewHeader: "#212121",
    stipedTableEvenRow: "#151515",
    appbarBorderBottom: "#424242",
    financeInfoCard: "#17171740",
  },
  ...defaultSettings,
});
