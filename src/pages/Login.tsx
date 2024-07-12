import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { warningToast } from "../utils/toasts";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signIn } from "../store/auth/authSlice";

export default function Login() {
  const { status, isAuth } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "all",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = async (data: any) => {
    await dispatch(signIn(data));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        textAlign: "center",
        maxWidth: "450px",
        mx: "auto",
      }}
    >
      <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
        تسجيل الدخول إلى المحكمة الجزائية
      </Typography>

      <form onSubmit={handleSubmit(handleLogin)}>
        <TextField
          {...register("username", {
            required: { value: true, message: "username required" },
          })}
          autoComplete="off"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder={"اسم المستخدم"}
          error={errors?.username?.message ? true : false}
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
                border: "1px solid #171A1F54", // Change the border color here
              },
              "&:hover fieldset": {
                borderRadius: "10px",
                border: "1px solid #171A1F54", // Change the border color on hover here
              },
              "&.Mui-focused fieldset": {
                borderRadius: "10px",
                border: "1px solid #171A1F54",
              },
            },
          }}
          InputProps={{
            style: {
              color: "#4E5D7899",
              backgroundColor: "transparent",
            },
            startAdornment: (
              <svg
                style={{
                  marginInlineEnd: "12px",
                  width: "24px",
                  height: "24px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#4E5D781A"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            ),
            endAdornment: <span></span>,
          }}
        />

        <TextField
          {...register("password", {
            required: { value: true, message: "password required" },
          })}
          error={errors?.password?.message ? true : false}
          autoComplete="off"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder={"كلمة السر"}
          type={showPassword ? "text" : "password"}
          //   error={!!errors.email}
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
                border: "1px solid #171A1F54", // Change the border color here
              },
              "&:hover fieldset": {
                borderRadius: "10px",
                border: "1px solid #171A1F54", // Change the border color on hover here
              },
              "&.Mui-focused fieldset": {
                borderRadius: "10px",
                border: "1px solid #171A1F54",
              },
            },
          }}
          InputProps={{
            style: {
              color: "#4E5D7899",
              backgroundColor: "transparent",
            },
            startAdornment: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#4E5D781A"
                style={{
                  marginInlineEnd: "12px",
                  width: "24px",
                  height: "24px",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            ),
            endAdornment: (
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                color="primary"
              >
                {showPassword ? (
                  <svg
                    style={{ width: "24px", height: "24px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                  </svg>
                ) : (
                  <svg
                    style={{ width: "24px", height: "24px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </IconButton>
            ),
          }}
        />

        <Button
          type="submit"
          sx={{
            backgroundColor: "#2CB34C",
            mt: "25px",
            borderRadius: "44px",
            py: "15px",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "#31ac4ebd",
            },
          }}
          disabled={!isValid || isSubmitting}
          fullWidth
          variant="contained"
        >
          تسجيل الدخول
        </Button>
      </form>
    </Box>
  );
}
