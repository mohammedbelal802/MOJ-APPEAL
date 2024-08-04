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

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "../store/auth/authSlice";

const schema = yup.object().shape({
  oldPassword: yup.string().required("هذا الحقل مطلوب"),
  newPassword: yup.string().required("هذا الحقل مطلوب"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "كلمة المرور غير مطابقة")
    .required("يجب عليك تأكيد كلمة المرور"),
});

export default function ChangePasswordPopup() {
  const {
    register,
    handleSubmit,

    formState: { isValid, errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClose = () => dispatch(hide());
  const onSubmit = async (data: any) => {
    const { confirmPassword, ...other } = data;
    await dispatch(changePassword({ data: other, navigate }));
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
          تغيير كلمة المرور
        </Typography>

        <CloseBtn onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label htmlFor="oldPassword">كلمة المرور القديمه</label>
            <TextField
              {...register("oldPassword")}
              autoComplete="off"
              variant="outlined"
              fullWidth
              margin="dense"
              id="oldPassword"
              type="text"
              error={errors?.oldPassword?.message ? true : false}
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
            <label htmlFor="newPassword">كلمة المرور الجديده</label>
            <TextField
              {...register("newPassword")}
              autoComplete="off"
              variant="outlined"
              fullWidth
              margin="dense"
              id="newPassword"
              type="text"
              error={errors?.newPassword?.message ? true : false}
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
            <label htmlFor="confirmPassword">تاكيد كلمة المرور</label>
            <TextField
              {...register("confirmPassword")}
              autoComplete="off"
              variant="outlined"
              fullWidth
              margin="dense"
              id="confirmPassword"
              type="text"
              error={errors?.confirmPassword?.message ? true : false}
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
              تغيير
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
