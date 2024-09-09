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
import { formatYear } from "../utils/funcations";
import moment from "moment-hijri";
import { getJiDerliveryVerificationCase } from "../store/jiDelivery/jiDeliverySlice";

const currentHijriYear = moment().format("iYYYY");
const currentYear = currentHijriYear;
export default function ReceiveJudgmentPopup() {
  const {
    register,
    handleSubmit,
    control,
    watch,
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
  const onSubmit = async (data: any) => {
    await dispatch(getJiDerliveryVerificationCase({ data: data, navigate }));
    // dispatch(show());
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
          استلام صك حكم
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
            <label htmlFor="caseNumber">ادخل رقم القضية</label>
            <TextField
              {...register("caseNumber", {
                required: { message: "Please enter caseNumber", value: true },
              })}
              autoComplete="off"
              variant="outlined"
              fullWidth
              margin="dense"
              id="caseNumber"
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
