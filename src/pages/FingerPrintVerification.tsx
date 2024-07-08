import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { hide } from "../store/modal/modalSlice";
import CloseBtn from "../components/ui/buttons/CloseBtn";
import { useForm } from "react-hook-form";
import UsersSelection from "../components/fingerprint-verification/UsersSelection";
import Alert from "../components/Alert";
import { useState } from "react";
import FingerPrintComponent from "../components/FingerPrintComponent";

export default function FingerPrintVerification() {
  const [openAlert, setOpenAlert] = useState(false);

  const {
    control,
    resetField,
    watch,
    formState: { isValid },
  } = useForm();
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
          التحقق من البصمة
        </Typography>
        <CloseBtn onClick={handleOpenAlert} />
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          px: "50px",
        }}
        className="style_scroll_bar"
      >
        <UsersSelection control={control} />

        <Box sx={{ backgroundColor: "white" }}>
          <Box
            sx={{
              p: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {watch("user") && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Typography
                    sx={{
                      color: "#617696",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    رقم الهوية:
                  </Typography>
                  <Typography
                    sx={{ color: "#000", fontSize: "14px", fontWeight: "400" }}
                  >
                    1005487961
                  </Typography>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Typography
                    sx={{
                      color: "#617696",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    الصفة:
                  </Typography>
                  <Typography
                    sx={{ color: "#000", fontSize: "14px", fontWeight: "400" }}
                  >
                    مدعي عليه
                  </Typography>
                </div>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginInlineStart: "auto",
              }}
            >
              <Button
                disabled={!isValid}
                sx={{
                  width: "fit-content",
                  fontWeight: "500",
                  borderRadius: "32px",
                  px: "60px",
                }}
                variant="contained"
                color="primary"
              >
                تحقق
              </Button>
              <IconButton
                onClick={() => resetField("fingerNumber")}
                sx={{
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  boxShadow: "0px 4px 14px 0px #00000021",
                  color: "#000",
                }}
              >
                <svg
                  style={{ width: "20px", height: "20px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                >
                  <path
                    d="M19.9239 8.617C19.8481 8.43431 19.7199 8.27819 19.5554 8.16837C19.391 8.05854 19.1976 7.99995 18.9999 8H17.9409C17.7478 6.27324 17.059 4.63927 15.9577 3.29537C14.8564 1.95147 13.3896 0.955098 11.7344 0.426537C10.0792 -0.102023 8.30646 -0.140169 6.63008 0.316704C4.9537 0.773578 3.4454 1.70594 2.28729 3.00122C1.12918 4.2965 0.370765 5.89933 0.103609 7.61619C-0.163547 9.33305 0.0719787 11.0905 0.781751 12.6765C1.49152 14.2624 2.6452 15.609 4.10349 16.5536C5.56178 17.4983 7.26234 18.0006 8.99986 18C9.26508 18 9.51943 17.8946 9.70697 17.7071C9.8945 17.5196 9.99986 17.2652 9.99986 17C9.99986 16.7348 9.8945 16.4804 9.70697 16.2929C9.51943 16.1054 9.26508 16 8.99986 16C7.65774 16.0016 6.34347 15.6173 5.21361 14.8929C4.08376 14.1685 3.18597 13.1346 2.62719 11.9144C2.06842 10.6941 1.87222 9.33894 2.06197 8.0103C2.25173 6.68167 2.81944 5.43559 3.69747 4.42053C4.57549 3.40547 5.72682 2.66422 7.01428 2.2851C8.30173 1.90597 9.67104 1.90496 10.9591 2.28217C12.2471 2.65938 13.3995 3.39891 14.279 4.41267C15.1586 5.42642 15.7281 6.67165 15.9199 8H14.9999C14.8021 8.00004 14.6088 8.05871 14.4444 8.1686C14.28 8.27848 14.1519 8.43465 14.0762 8.61735C14.0005 8.80005 13.9807 9.00108 14.0193 9.19503C14.0578 9.38898 14.153 9.56715 14.2929 9.707L16.2929 11.707C16.4804 11.8945 16.7347 11.9998 16.9999 11.9998C17.265 11.9998 17.5193 11.8945 17.7069 11.707L19.7069 9.707C19.8468 9.56715 19.9421 9.38895 19.9807 9.19492C20.0194 9.0009 19.9996 8.79977 19.9239 8.617Z"
                    fill="black"
                  />
                </svg>
              </IconButton>
            </Box>
          </Box>

          <FingerPrintComponent control={control} />
        </Box>
      </DialogContent>
    </>
  );
}
