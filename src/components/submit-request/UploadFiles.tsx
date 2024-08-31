import { Box, Button, Typography } from "@mui/material";
import React from "react";
import DragAndDropZone from "../ui/inputs/DargAndDropZone";
import NoUserSelected from "../fingerprint-verification/NoUserSelected";
import { useForm } from "react-hook-form";

export default function UploadFiles({
  handleNextStep,
}: {
  handleNextStep: (data: any) => void;
}) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = (data: any) => handleNextStep(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ position: "relative" }}>
        <DragAndDropZone control={control} isLoading={false} name="files" />

        {watch("files").length > 0 && (
          <Box
            sx={{
              position: "absolute",
              bottom: "0px",
              left: "0px",
              p: "20px",
              display: "flex",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <Button
              sx={{
                padding: "6px 30px",
                borderRadius: "32px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
              color="primary"
              variant="contained"
            >
              <svg
                style={{
                  width: "16px",
                  height: "16px",
                  color: "#fff",
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
              تقديم
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          type="submit"
          sx={{ px: "30px", borderRadius: "20px" }}
          disabled={watch("files").length === 0}
          variant="contained"
          color="primary"
        >
          التالي
        </Button>
      </Box>
    </form>
  );
}
