import { AppBar, Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function MemberAuthorization() {
  return (
    <>
      <AppBar
        sx={{
          boxShadow: "none",
          backgroundColor: "#1D3A39",
          maxHeight: "20vh",
        }}
        position="static"
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            maxWidth: "none !important",
            padding: {
              xs: "12px 20px",
              md: "15px 32px",
            },
          }}
        >
          <Typography
            sx={{ fontSize: "24px", fontWeight: "400", color: "#FFFFFF" }}
          >
            المحكمة الجزائية
          </Typography>
        </Container>
      </AppBar>

      <Outlet />
    </>
  );
}
