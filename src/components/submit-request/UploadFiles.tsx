import { Box, Button, Typography } from "@mui/material";
import React from "react";
import DragAndDropZone from "../ui/inputs/DargAndDropZone";
import NoUserSelected from "../fingerprint-verification/NoUserSelected";
import { useForm } from "react-hook-form";

export default function UploadFiles({
  formData,
  handleNextStep,
  disableUpload,
}: {
  handleNextStep: (data: any) => void;
  disableUpload: boolean;
  formData: any;
}) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      files: formData.files || [],
    },
  });

  const onSubmit = (data: any) => handleNextStep(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ position: "relative" }}>
        <DragAndDropZone
          disabled={disableUpload}
          control={control}
          isLoading={false}
          name="files"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          position: "sticky",
          bottom: "0px",
          left: "0px",
        }}
      >
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
