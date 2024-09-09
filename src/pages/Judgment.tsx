import { useAppSelector } from "../store/hooks";
import { AppBar, Box, Container, Typography } from "@mui/material";
import JudgmentForm from "../components/judgment/JudgmentForm";
import JudgmentDetails from "../components/judgment/JudgmentDetails";
import IdleStatus from "../components/authorize-members/IdleStatus";
import NotFoundStatus from "../components/authorize-members/NotFoundStatus";
import JudgmentAuth from "../components/judgment/JudgmentAuth";

export default function Judgment() {
  const { status, data } = useAppSelector((state) => state.jiJdVerification);
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
      <Box sx={{ backgroundColor: "#1D3A39" }}>
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
          {status === "success" ? (
            <JudgmentDetails
              name={data.name}
              status={data.status}
              caseNumber={data.caseNumber}
              instrumentNumber={data.instrumentNumber}
              year={data.year}
              books={data.books}
            />
          ) : (
            <JudgmentForm />
          )}
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "#F5F8FA", height: "85vh" }}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
            maxWidth: "none !important",
            height: "100%",
            padding: {
              xs: "12px 20px",
              md: "15px 32px",
            },
          }}
        >
          {status === "idle" && (
            <IdleStatus message="قم بالبحث برقم القضية والتاريخ" />
          )}
          {status === "error" && (
            <NotFoundStatus message="لا يوجد نتائج بحث من فضلك تحقق من رقم القضية أو التاريخ" />
          )}
          {status === "success" && <JudgmentAuth />}
        </Container>
      </Box>
    </>
  );
}
