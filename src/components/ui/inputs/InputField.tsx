import { alpha, styled } from "@mui/material/styles";
import { InputBase, TextField, TextFieldProps } from "@mui/material";
import React from "react";

interface InputFieldProps {
  register?: any;
  error?: any;
  sx?: any;
  placeholder?: string;
  // You can add any additional props specific to InputField here
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const InputField: React.FC<InputFieldProps> = (props) => {
  const { error, register, placeholder } = props;

  return (
    <BootstrapInput
      {...register}
      autoComplete="off"
      placeholder={placeholder}
      fullWidth
      margin="dense"
      id="caseNumber"
      error={error ? true : false}
      sx={{
        ...props.sx,
        // Your existing styles here
      }}
    />
  );
};

export default InputField;
