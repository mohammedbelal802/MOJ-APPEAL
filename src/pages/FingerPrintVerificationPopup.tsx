import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import CloseBtn from "../components/ui/buttons/CloseBtn";
import { useAppDispatch } from "../store/hooks";
import { hide, show } from "../store/modal/modalSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HijriYearDropdown from "../components/ui/HijriYearDropdown";
import moment from "moment-hijri";
const currentHijriYear = moment().format("iYYYY");
const currentYear = currentHijriYear;

export default function FingerPrintVerificationPopup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      sessionId: "",
      caseId: "",
      year: +currentYear,
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClose = () => dispatch(hide());
  const onSubmit = (data: any) => {
    dispatch(show());
    console.log(data);
    navigate("/modal/fingerprint");
  };

  return (
    <>
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

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <HijriYearDropdown name={"year"} control={control} />
          <CloseBtn onClick={onClose} />
        </Box>
      </DialogTitle>
      <DialogContent>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label htmlFor="caseId">رقم القضية</label>
            <TextField
              {...register("caseId", {
                required: { value: true, message: "caseId required" },
              })}
              autoComplete="off"
              variant="outlined"
              fullWidth
              margin="dense"
              id="caseId"
              error={errors?.caseId?.message ? true : false}
              sx={{
                // backgroundColor: "transparent",
                width: "100%",
                height: "48px",
                flexShrink: 0,
                "& .MuiInputBase-input": {
                  py: "14px",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "10px",
                    border: "1px solid #D9D9D9", // Change the border color here
                  },
                  "&:hover fieldset": {
                    borderRadius: "10px",
                    border: "1px solid #D9D9D9", // Change the border color on hover here
                  },
                  "&.Mui-focused fieldset": {
                    borderRadius: "10px",
                    border: "1px solid #D9D9D9",
                  },
                },
              }}
              InputProps={{
                style: {
                  color: "#4E5D7899",
                  backgroundColor: "#fff",
                },
              }}
            />
          </div>

          <div>
            <label htmlFor="sessionId">رقم الجلسة</label>
            <TextField
              {...register("sessionId", {
                required: { value: true, message: "sessionId required" },
              })}
              autoComplete="off"
              variant="outlined"
              fullWidth
              margin="dense"
              id="sessionId"
              error={errors?.sessionId?.message ? true : false}
              sx={{
                // backgroundColor: "transparent",
                width: "100%",
                height: "48px",
                flexShrink: 0,
                "& .MuiInputBase-input": {
                  py: "14px",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "10px",
                    border: "1px solid #D9D9D9", // Change the border color here
                  },
                  "&:hover fieldset": {
                    borderRadius: "10px",
                    border: "1px solid #D9D9D9", // Change the border color on hover here
                  },
                  "&.Mui-focused fieldset": {
                    borderRadius: "10px",
                    border: "1px solid #D9D9D9",
                  },
                },
              }}
              InputProps={{
                style: {
                  color: "#4E5D7899",
                  backgroundColor: "#fff",
                },
              }}
            />
          </div>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              mt: "20px",
            }}
          >
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
              disabled={!isValid}
              sx={{
                width: "fit-content",
                fontWeight: "500",
                borderRadius: "32px",
                px: "60px",
              }}
            >
              إدخال
            </Button>
            <Button
              onClick={onClose}
              variant="text"
              sx={{
                width: "fit-content",
                fontWeight: "500",
                borderRadius: "32px",
                px: "60px",
                backgroundColor: "#E1E8ED",
              }}
            >
              إغلاق
            </Button>
          </Box>
        </form>
      </DialogContent>
    </>
  );
}
