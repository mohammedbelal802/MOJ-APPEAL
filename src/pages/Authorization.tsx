import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { hide } from "../store/modal/modalSlice";
import CloseBtn from "../components/ui/buttons/CloseBtn";
import Authorize from "../components/authorize/Authorize";
import { useState } from "react";
import Alert from "../components/Alert";
import BookList from "../components/BookList";
interface PERSON {
  id: any;
  job: string;
  name: string;
  status: string;
}
export default function Authorization() {
  const { data } = useAppSelector((state) => state.verificationCase);

  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = () => dispatch(hide());
  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  return (
    <>
      <Alert
        firstBtn={{ color: "warning", text: "إغلاق", variant: "contained" }}
        secondBtn={{ color: "inherit", text: "الغاء", variant: "outlined" }}
        open={openAlert}
        title="إغلاق النافذة"
        message="هل أنت متأكد من أنك تريد إغلاق النافذة ؟"
        onSubmit={onSubmit}
        handleClose={handleCloseAlert}
        icon={
          <svg
            style={{ width: "24px", height: "24px", color: "#EE4F4F" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        }
        iconBgColor={"#FEE4E2"}
      />
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ color: "#3D3F65", fontSize: "22px", fontWeight: "400" }}
        >
          مراجعة ومصادقة
        </Typography>
        <CloseBtn onClick={handleOpenAlert} />
      </DialogTitle>
      <DialogContent sx={{ px: "50px" }} className="style_scroll_bar">
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#363841",
            mb: "8px",
          }}
        >
          مراجعة ضبط الجلسة
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            p: "22px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 19px 0px #4548520A",
            borderRadius: "4px",
            width: "100%",
          }}
        >
          <BookList
            books={data.books}
            buttonProps={{ color: "secondary", variant: "contained" }}
          />
        </Box>
        <Authorize users={data.persons} />
      </DialogContent>
    </>
  );
}
