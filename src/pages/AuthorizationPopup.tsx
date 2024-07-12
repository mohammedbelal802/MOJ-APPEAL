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
import { useEffect } from "react";
import HijriYearDropdown from "../components/ui/HijriYearDropdown";
import moment from "moment-hijri";
import { formatYear } from "../utils/funcations";
const currentHijriYear = moment().format("iYYYY");
const currentYear = currentHijriYear;

export default function AuthorizationPopup() {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    getValues,
    control,
    formState: { isValid, errors },
  } = useForm<any>({
    mode: "all",
    defaultValues: {
      year: formatYear(currentYear),
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClose = () => dispatch(hide());
  const onSubmit = () => {
    dispatch(show());
    navigate("/modal/authorization", { state: getValues("option") });
  };

  useEffect(() => {
    resetField("sessionId");
  }, [watch("option")]);

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
          مصادقة على ضبط الجلسه :
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <HijriYearDropdown name={"year"} control={control}>
            {watch("year") + " " + "هـ"}
          </HijriYearDropdown>
          <CloseBtn onClick={onClose} />
        </Box>
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label htmlFor="caseId">رقم القضية</label>
            <TextField
              {...register("caseId", {
                required: { value: true, message: "caseId requried" },
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
            <label
              style={{ opacity: watch("option") === "roling" ? "0.3" : "1" }}
              htmlFor="sessionId"
            >
              رقم الجلسة
            </label>
            <TextField
              {...register("sessionId", {
                required: {
                  value: watch("option") === "roling" ? false : true,
                  message: "caseId required",
                },
              })}
              disabled={watch("option") === "roling" ? true : false}
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
                  "&.Mui-disabled": {
                    backgroundColor: "transparent !important",
                    opacity: "0.3",
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
              type="submit"
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
