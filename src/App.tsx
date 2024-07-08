import { ThemeProvider } from "@mui/material";
import theme from "./MuiTheme";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/router";
import { Toaster } from "react-hot-toast";

function App() {
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
