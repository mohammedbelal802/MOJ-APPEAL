import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { hide } from "../store/modal/modalSlice";
import CloseBtn from "../components/ui/buttons/CloseBtn";
import { Controller, useForm } from "react-hook-form";
import Alert from "../components/Alert";
import { useEffect, useState } from "react";
import { usersConfig } from "../utils/config";
import NoUserSelected from "../components/fingerprint-verification/NoUserSelected";
import DragAndDropZone from "../components/ui/inputs/DargAndDropZone";

export default function SubmitRequest() {
  const [openAlert, setOpenAlert] = useState(false);

  const { control, resetField, watch } = useForm({
    defaultValues: { files: [], user: "", requestType: "" },
  });
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "files",
  // });
  const dispatch = useAppDispatch();
  const onSubmit = () => dispatch(hide());
  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  useEffect(() => {
    resetField("files");
  }, [watch("user")]);
  return (
    <>
      <Alert
        firstBtn={{ color: "warning", text: "إغلاق", variant: "contained" }}
        secondBtn={{ color: "inherit", text: "الغاء", variant: "outlined" }}
        open={openAlert}
        title="إغلاق النافذة"
        message="هل أنت متأكد من أنك تريد إغلاق النافذة ؟"
        onSubmit={onSubmit}
        handleClose={handleCloseAlert}
        icon={
          <svg
            style={{ width: "24px", height: "24px", color: "#EE4F4F" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        }
        iconBgColor={"#FEE4E2"}
      />
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
          تقديم الطلب
        </Typography>
        <CloseBtn onClick={handleOpenAlert} />
      </DialogTitle>
      <DialogContent
        className="style_scroll_bar"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          px: "50px",
        }}
      >
        <div>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#363841",
              mb: "5px",
            }}
          >
            نوع الطلب
          </Typography>
          <Box
            sx={{
              p: "18px 15px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              boxShadow: "0px 4px 19px 0px #4548520A",
            }}
          >
            <Controller
              name="requestType"
              control={control}
              render={({ field }) => {
                return (
                  <RadioGroup
                    name={field.name}
                    onChange={(e) => field.onChange(e.target.value)}
                    sx={{ flexDirection: "row", gap: "70px" }}
                  >
                    <FormControlLabel
                      sx={{
                        m: "0px",
                        color: "#617696",
                        "& .MuiTypography-root": {
                          fontSize: "14px !important",
                        },
                      }}
                      value="objection"
                      control={<Radio />}
                      label="طلب اعتراض"
                    />

                    <FormControlLabel
                      sx={{
                        m: "0px",
                        color: "#617696",
                        "& .MuiTypography-root": {
                          fontSize: "14px !important",
                        },
                      }}
                      value="appeal"
                      control={<Radio />}
                      label="طلب نقض"
                    />

                    <FormControlLabel
                      sx={{
                        m: "0px",
                        color: "#617696",
                        "& .MuiTypography-root": {
                          fontSize: "14px !important",
                        },
                      }}
                      value="caserequests"
                      control={<Radio />}
                      label="الطلبات على القضايا"
                    />
                  </RadioGroup>
                );
              }}
            />
          </Box>
        </div>

        <div>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#363841",
              mb: "5px",
            }}
          >
            أطراف الدعوي
          </Typography>
          <Box sx={{ backgroundColor: "white" }}>
            <Box
              sx={{
                p: "16px",
              }}
            >
              <Controller
                name="user"
                control={control}
                render={({ field }) => {
                  return (
                    <Box sx={{ display: "flex", gap: "12px" }}>
                      {usersConfig.map((item: any, index: number) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              cursor: "pointer",
                              flexShrink: 0,
                              padding: "8px 20px",
                              backgroundColor:
                                field.value === item ? "#077C5A" : "#F5F8FA",
                              color: field.value === item ? "#fff" : "#617696",
                              fontSize: "12px",
                              fontWeight: "400",
                              borderRadius: "8px",
                            }}
                            onClick={() => field.onChange(item)}
                          >
                            {item}
                          </Box>
                        );
                      })}
                    </Box>
                  );
                }}
              />

              {watch("user") ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#617696",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        رقم الهوية:
                      </Typography>
                      <Typography
                        sx={{
                          color: "#000",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        1005487961
                      </Typography>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#617696",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        الصفة:
                      </Typography>
                      <Typography
                        sx={{
                          color: "#000",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        مدعي عليه
                      </Typography>
                    </div>
                  </Box>
                  <Box sx={{ position: "relative" }}>
                    <DragAndDropZone
                      control={control}
                      isLoading={false}
                      name="files"
                    />

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
                </>
              ) : (
                <NoUserSelected />
              )}
            </Box>
          </Box>
        </div>
      </DialogContent>
    </>
  );
}
