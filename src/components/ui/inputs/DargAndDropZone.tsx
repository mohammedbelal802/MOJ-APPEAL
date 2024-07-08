import { Box, Button, Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import CloseBtn from "../buttons/CloseBtn";

export default function DragAndDropZone({
  control,
  isLoading,
  name,
}: {
  control: any;
  isLoading?: boolean;
  name: string;
}) {
  const [isDraging, setIsDraging] = useState(false);
  const inputRef = useRef<any>();
  const onDrop = (event: any, onChange: any, values: any) => {
    event.preventDefault();
    if (isLoading) return;
    const files = event.dataTransfer.files;
    setIsDraging(false);
    onChange([...values, ...files]);
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    if (isLoading) return;
    setIsDraging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (event: any) => {
    event.preventDefault();
    if (isLoading) return;
    setIsDraging(false);
  };

  // const converToBase64 = (file: any, onChange: any) => {
  //   const reader: any = new FileReader();
  //   reader.readAsDataURL(file);
  //   return (reader.onload = () => {
  //     const base64 = reader?.result?.split(",")[1];
  //     onChange(base64);
  //   });
  // };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "6/2",
                border: "2px dashed rgba(0, 0, 0, 0.12)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundColor: "#FBFBFB",
                my: "10px",
              }}
              onDrop={(e) => onDrop(e, (files: any) => onChange(files), value)}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            >
              {!isDraging && value?.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <svg
                    style={{ width: "45px", height: "45px", color: "#067C5A" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>

                  <Typography
                    sx={{
                      color: "#292D32",
                      fontSize: "25px",
                      fontWeight: "500",
                    }}
                  >
                    إختيار أو سحب الملف
                  </Typography>
                  <Typography
                    sx={{
                      color: "#A9ACB4",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    تنسيقات Word وPDF
                  </Typography>

                  <label
                    style={{
                      padding: "13px 40px",
                      borderRadius: "32px",
                      color: "white",
                      backgroundColor: "#067C5A",
                      fontSize: "16px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    htmlFor="file"
                  >
                    إختر ملف
                  </label>
                </Box>
              ) : (
                <Grid
                  container
                  spacing={2}
                  sx={{ p: "10px 20px", alignSelf: "start" }}
                >
                  {value.map((item: any, index: number) => {
                    return (
                      <Grid
                        sx={{ height: "fit-content" }}
                        key={item?.lastModified + index}
                        item
                        xs={12}
                        md={6}
                      >
                        <Box
                          sx={{
                            p: "10px 16px",
                            border: "0.6px solid #00000017",
                            backgroundColor: "white",
                            display: "flex",
                            gap: "20px",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            style={{
                              width: "40px",
                              height: "40px",
                              color: "#000",
                              flexShrink: 0,
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                            />
                          </svg>

                          <div>
                            <Typography
                              sx={{
                                fontWeight: "500",
                                color: "#292D32",
                                lineClamp: "1",
                                WebkitLineClamp: "1",
                              }}
                              className="line-clamp"
                            >
                              {item?.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "#A9ACB4",
                              }}
                            >
                              {Math.round(item?.size / 1024)} كيلوبايت
                            </Typography>
                          </div>

                          <div style={{ marginRight: "auto" }}>
                            <CloseBtn
                              onClick={() => {
                                const newFiles = value.filter(
                                  (file: any) =>
                                    file?.lastModified !== item?.lastModified
                                );
                                onChange(newFiles);
                              }}
                            />
                          </div>
                        </Box>
                      </Grid>
                    );
                  })}
                  <Grid item xs={12}>
                    <Button
                      onClick={() => inputRef.current.click()}
                      sx={{
                        mt: "10px",
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        boxShadow: "0px 8px 8px 0px #AAB8C20A",
                      }}
                      fullWidth
                      color="primary"
                      variant="text"
                    >
                      <svg
                        style={{
                          width: "24px",
                          height: "24px",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      اضافة ملف
                    </Button>
                  </Grid>
                </Grid>
              )}

              <input
                ref={inputRef}
                onChange={(e: any) => {
                  if (e.target.files.length === 0) return;
                  const file = e.target.files[0];
                  onChange([...value, file]);
                }}
                multiple
                type="file"
                id="file"
                style={{ display: "none" }}
              />
            </Box>
          </>
        );
      }}
    />
  );
}
