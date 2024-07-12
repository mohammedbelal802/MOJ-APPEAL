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
import { convertToEnglish, formatYear } from "../utils/funcations";
import { getFingerPrintCase } from "../store/fingerPrintVerification/fingerPrintCaseSlice";
const currentHijriYear = moment().format("iYYYY");
const currentYear = currentHijriYear;

export default function FingerPrintVerificationPopup() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid, errors, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      sessionNumber: null,
      caseNumber: null,
      year: formatYear(currentYear),
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClose = () => dispatch(hide());
  const onSubmit = async (data: any) => {
    await dispatch(
      getFingerPrintCase({
        data: { ...data, year: convertToEnglish(data.year) },
        navigate: navigate,
      })
    );
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
          <HijriYearDropdown name={"year"} control={control}>
            {watch("year") + " " + "هـ"}
          </HijriYearDropdown>
          <CloseBtn onClick={onClose} />
        </Box>
      </DialogTitle>
      <DialogContent>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label htmlFor="caseNumber">رقم القضية</label>
            <TextField
              {...register("caseNumber", {
                required: { value: true, message: "caseNumber required" },
              })}
              autoComplete="off"
              variant="outlined"
              fullWidth
              margin="dense"
              id="caseNumber"
              type="number"
              error={errors?.caseNumber?.message ? true : false}
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
            <label htmlFor="sessionNumber">رقم الجلسة </label>
            <TextField
              {...register("sessionNumber", {
                required: { value: true, message: "sessionNumber required" },
              })}
              autoComplete="off"
              variant="outlined"
              fullWidth
              margin="dense"
              id="sessionNumber"
              type="number"
              error={errors?.sessionNumber?.message ? true : false}
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
              disabled={!isValid || isSubmitting}
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
