import { Box, Button, Typography } from "@mui/material";

interface props {
  status: string;
  caseNumber: string;
  year: string;
  name: string;
}
export default function InquiryDetails({
  status,
  caseNumber,
  year,
  name,
}: props) {
  return (
    <Box sx={{ display: "flex", gap: "80px", width: "100%" }}>
      <Box sx={{ gap: "40px", display: "flex" }}>
        <Typography
          sx={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "400" }}
        >
          رقم القضية : {caseNumber}
        </Typography>

        <Typography
          sx={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "400" }}
        >
          السنة : {year}
        </Typography>
      </Box>

      <Box sx={{ gap: "40px", display: "flex" }}>
        <Typography
          sx={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "400" }}
        >
          الإسم : {name}
        </Typography>
        <Typography
          sx={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "400" }}
        >
          الصفة : {status}
        </Typography>
      </Box>
    </Box>
  );
}
