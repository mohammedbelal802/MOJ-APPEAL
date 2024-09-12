import { Box, Button, FormControl, InputLabel } from "@mui/material";
import InputField from "../ui/inputs/InputField";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { getSubmitedCaseRequests } from "../../store/inquiry/inquirySlice";

export default function InquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

  const dispatch = useAppDispatch();
  const onSubmit = async (data: any) => {
    await dispatch(getSubmitedCaseRequests({ data }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <InputLabel sx={{ fontSize: "20px", flexShrink: "0", color: "#fff" }}>
            رقم القضية :
          </InputLabel>
          <InputField
            register={register("caseNumber", { required: true })}
            error={errors?.caseNumber?.message}
            sx={{
              "& .MuiInputBase-input": {
                backgroundColor: "#D9D9D9",
                width: "200px",
              },
            }}
            placeholder="رقم القضية"
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <InputLabel sx={{ fontSize: "20px", flexShrink: "0", color: "#fff" }}>
            السنة :
          </InputLabel>
          <InputField
            register={register("year", { required: true })}
            error={errors?.year?.message}
            sx={{
              "& .MuiInputBase-input": {
                backgroundColor: "#D9D9D9",
                width: "200px",
              },
            }}
            placeholder="السنة الهجرية"
          />
        </Box>

        <Button
          disabled={isSubmitting || !isValid}
          sx={{
            p: "4px 40px",
            fontSize: "20px",
            color: "#fff",
            "&.Mui-disabled": { backgroundColor: "#ffffff3b" },
          }}
          variant="contained"
          color="primary"
          type="submit"
        >
          إدخال
        </Button>
      </Box>
    </form>
  );
}
