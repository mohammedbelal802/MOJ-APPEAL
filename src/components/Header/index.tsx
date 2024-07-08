import { AppBar, Container, Typography } from "@mui/material";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  return (
    <AppBar
      sx={{
        boxShadow: "none",
        backgroundColor: "#1D252D",
        maxHeight: "20vh",
      }}
      position="fixed"
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

        <ProfileMenu />
      </Container>
    </AppBar>
  );
}
