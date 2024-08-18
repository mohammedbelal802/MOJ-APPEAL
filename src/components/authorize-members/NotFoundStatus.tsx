import { Box, Typography } from "@mui/material";
import bgStatus from "../../assets/authEmp/notFoundStatus.png";
import icon from "../../assets/authEmp/notFoundIcon.png";

export default function NotFoundStatus({ message }: { message: string }) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "115px",
          aspectRatio: "1/1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={bgStatus}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />

        <img
          src={icon}
          style={{
            position: "absolute",
            objectFit: "contain",
            width: "63px",
            height: "63px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      </Box>

      <Typography
        sx={{
          fontWeight: "500",
          maxWidth: "300px",
          textAlign: "center",
          mt: "8px",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}
