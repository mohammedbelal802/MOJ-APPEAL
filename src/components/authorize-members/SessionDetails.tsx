import { Box, Button, Typography } from "@mui/material";
import BookList from "../BookList";

interface props {
  status: string;
  sessionNumber: string;
  caseNumber: string;
  year: string;
  name: string;
  books: any;
}
export default function SessionDetails({
  status,
  caseNumber,
  sessionNumber,
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
          رقم الجلسة : {sessionNumber}
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
        <BookList
          sx={{ p: "0px !important", backgroundColor: "transparent" }}
          books={books}
        />
      </Box>
    </Box>
  );
}
