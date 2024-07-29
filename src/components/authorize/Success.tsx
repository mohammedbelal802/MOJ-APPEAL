import { Box, Typography } from "@mui/material";
import successAuth from "../../assets/authSuccess.png";

export default function Success() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <img
        style={{ maxWidth: "160px", aspectRatio: "1/1", width: "100%" }}
        src={successAuth}
      />
      <Typography sx={{ fontSize: "22px" }}>تم المصادقة بنجاح</Typography>
    </Box>
  );
}
