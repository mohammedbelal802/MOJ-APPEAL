import { Box, Typography } from "@mui/material";
import ReciveJudmentBookList from "../BookList/ReciveJudmentBookList";

interface props {
  status: string;
  caseNumber: string;
  year: string;
  name: string;
  books: any;
}
export default function JudgmentDetails({
  status,
  caseNumber,
  year,
  name,
  books,
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
          السنة : {year}
        </Typography>
      </Box>

      <Box sx={{ gap: "40px", display: "flex" }}>
        {/* <Typography
          sx={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "400" }}
        >
          الإسم : {name}
        </Typography>
        <Typography
          sx={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "400" }}
        >
          الصفة : {status}
        </Typography> */}
        <ReciveJudmentBookList
          sx={{ p: "0px !important", backgroundColor: "white" }}
          books={books}
        />
      </Box>
    </Box>
  );
}
