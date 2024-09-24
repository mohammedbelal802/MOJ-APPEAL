import { useAppSelector } from "../store/hooks";
import { AppBar, Box, Container, Typography } from "@mui/material";
import IdleStatus from "../components/authorize-members/IdleStatus";
import NotFoundStatus from "../components/authorize-members/NotFoundStatus";
import InquiryDetails from "../components/inquiry/InquiryDetails";
import InquiryForm from "../components/inquiry/InquiryForm";
import InquiryTable from "../components/inquiry/InquiryTable";

export default function Inquiry() {
  const { status, data } = useAppSelector((state) => state.inquiry);
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
            محكمة الإستئناف
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
            <InquiryDetails
              name={data.name}
              status={data.status}
              caseNumber={data.caseNumber}
              year={data.year}
            />
          ) : (
            <InquiryForm />
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
            <IdleStatus message="يجب أن يتم إدخال رقم القضية، والسنة لإسترجاع ضبط الجلسة المراد المصادقة عليه" />
          )}
          {status === "error" && (
            <NotFoundStatus message="لا يوجد نتائج بحث من فضلك تحقق من رقم القضية أو التاريخ" />
          )}
          {status === "success" && <InquiryTable />}
        </Container>
      </Box>
    </>
  );
}
