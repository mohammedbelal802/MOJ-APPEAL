import { Box, Button, Typography } from "@mui/material";

interface props {
  status: string;
  instrumentNumber: string;
  caseNumber: string;
  year: string;
  name: string;
}
export default function JudgmentDetails({
  status,
  caseNumber,
  instrumentNumber,
  year,
  name,
}: props) {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <Box sx={{ gap: "40px", display: "flex" }}>
        <Typography
          sx={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "400" }}
        >
          رقم القضية : {caseNumber}
        </Typography>
        <Typography
          sx={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "400" }}
        >
          رقم الصك : {instrumentNumber}
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
        <Button
          color="inherit"
          variant="contained"
          sx={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
          >
            <path
              d="M9.90964 0H1.90964C1.10633 0 0.455078 0.651219 0.455078 1.45453V14.5454C0.455078 15.3488 1.1063 16 1.90961 16H12.0914C12.8947 16 13.546 15.3488 13.546 14.5454V4L9.90964 0ZM12.8187 14.5455C12.8187 14.9471 12.4931 15.2727 12.0915 15.2727H1.90964C1.50798 15.2727 1.18236 14.9471 1.18236 14.5455V1.45453C1.18236 1.05287 1.50798 0.72725 1.90964 0.72725H8.45511V4.36363C8.45511 4.76528 8.7807 5.09091 9.18239 5.09091H12.8188L12.8187 14.5455ZM9.18236 4.36363V0.727281H9.54598L12.8187 4.36366L9.18236 4.36363Z"
              fill="black"
            />
          </svg>
          عرض ملف ضبط الجلسة
        </Button>
      </Box>
    </Box>
  );
}
