import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export default function PageLoader() {
  return (
    <Box
      sx={{
        height: "100lvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
