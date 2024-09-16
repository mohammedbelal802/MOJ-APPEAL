import { Box, Button, Container } from "@mui/material";
import logo from "../assets/authlogo.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { show } from "../store/modal/modalSlice";
import PrimaryButton from "../components/ui/buttons/PrimaryButton";

export default function Landing() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        backgroundColor: "#F5F8FA",
      }}
    >
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "650px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            borderTop: "4px solid #2CB34C",
            boxShadow: "2px 20px 40px 0px #077C5A12",
            padding: { xs: "20px", sm: "34px 45px", md: "54px 75px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "25px",
            mt: "40px",
          }}
        >
          <img
            src={logo}
            style={{
              aspectRatio: "16/14",
              width: "100%",
              maxWidth: "168px",
              objectFit: "contain",
            }}
          />

          <PrimaryButton
            onClick={() => {
              dispatch(show());
              navigate("/popup/fingerprint");
            }}
          >
            التحقق من البصمة
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              dispatch(show());
              navigate("/popup/authorization");
            }}
          >
            المصادقة على ضبط الجلسة
          </PrimaryButton>
          <Button
            onClick={() => {
              dispatch(show());
              navigate("/popup/caseid");
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            تقديم الطلبات القضائية
          </Button>

          <Button
            onClick={() => {
              dispatch(show());
              navigate("/popup/receive-judgment");
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            تسليم صك الحكم
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
