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
interface PERSON {
  id: any;
  job: string;
  name: string;
  status: string;
}
export default function Authorization() {
  const { data } = useAppSelector((state) => state.verificationCase);
  const [selectedUser, setSelectedUser] = useState<PERSON>({
    id: null,
    name: "",
    job: "",
    status: "",
  });
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
          className={"style-scroll-bar"}
          sx={{
            display: "flex",
            gap: "20px",
            p: "18px 15px",
            boxShadow: "0px 4px 19px 0px #4548520A",
            backgroundColor: "#fff",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
          {data.books.map((item: any, index: number) => (
            <Button
              onClick={() => {
                window.location.href = item.url;
              }}
              key={index}
              sx={{
                width: "fit-content",
                fontWeight: "500",
                px: "20px",
                backgroundColor: "#F5F8FA",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#000",
              }}
              color="primary"
              variant="text"
            >
              <svg
                style={{ width: "16px", height: "16px" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              {index === 0 ? "عرض ضبط الجلسه" : "عرض باقي ضبط الجلسه"}
            </Button>
          ))}
        </Box>
        <Authorize
          users={data.persons}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </DialogContent>
    </>
  );
}
