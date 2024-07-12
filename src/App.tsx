import { ThemeProvider } from "@mui/material";
import theme from "./MuiTheme";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    //@ts-ignore
    if (!window.Fingerprint) {
      window.location.replace("/");
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <Toaster position="bottom-left" />
    </>
  );
}

export default App;
