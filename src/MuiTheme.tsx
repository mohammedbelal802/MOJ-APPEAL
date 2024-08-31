import { createTheme } from "@mui/material";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#077C5A", // Customize the primary color
    },
    secondary: {
      main: "#FF7900", // Customize the secondary color
    },
    warning: {
      main: "#EE404C",
    },
    info: {
      main: "#18BA59",
    },
    success: {
      main: "#18BA59",
    },
    error: {
      main: "#EE4F4F",
    },
    text: {
      primary: "#1D252D",
      secondary: "#657786",
    },
    // Add more color options as needed
  },
  typography: {
    fontFamily: "IBM Plex Sans Arabic, sans-serif",
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          borderRadius: "44px",
          py: "12px",
          fontWeight: "600",
          "&.Mui-disabled": {
            backgroundColor: "#EFF2F4 !important",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
        },
      },
    },
  },
});
export default theme;
