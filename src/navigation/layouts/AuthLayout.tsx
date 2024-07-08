import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import logo from "../../assets/authlogo.svg";

export default function AuthLayout() {
  return (
    <Box
      sx={{
        px: "24px",
        pt: "24px",
        display: "flex",
        alignItems: "center",
        height: "100svh",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "45%",
          background: "linear-gradient(315deg, #067C5A 0%, #044531 100%)",
          borderTopRightRadius: "16px",
          borderTopLeftRadius: "16px",
          paddingTop: "50px",
          px: "30px",
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            border: "1px solid #AAB8C2",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src={logo}
            style={{
              aspectRatio: "14/16",
              width: "auto",
              maxWidth: "180px",
              objectFit: "contain",
            }}
          />

          <Typography
            sx={{ fontSize: "28px", fontWeight: "400", color: "#FFFFFF" }}
          >
            بوابة الجلسات المرئية
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
