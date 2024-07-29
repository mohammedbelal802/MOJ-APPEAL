import { Box, Typography } from "@mui/material";
import errorAuth from "../../assets/error.png";

export default function Error() {
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
        src={errorAuth}
      />
      <Typography sx={{ fontSize: "22px" }}>
        حدث خطأ ما، من فضلك حاول مره أخري
      </Typography>
    </Box>
  );
}
