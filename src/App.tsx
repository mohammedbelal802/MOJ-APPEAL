import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "./MuiTheme";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  useEffect(() => {
    //@ts-ignore
    if (!window.Fingerprint) {
      window.location.replace("/");
    }
  }, []);
  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </CacheProvider>
      <Toaster position="bottom-left" />
    </>
  );
}

export default App;
