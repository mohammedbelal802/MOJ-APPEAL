import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, IconButton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import DigitalSigntureInput from "../DigitalSigntureInput";
import { useForm } from "react-hook-form";
import FingerPrintComponent from "../FingerPrintComponent";
import qrImg from "../../assets/authEmp/qr.png";
import SearchInput from "../ui/inputs/SearchInput";
import { generateQrCode } from "../../store/verificationCase/verificationCaseSlice";
import { submitJdPersonVerification } from "../../store/authMembers/authMembersSlice";
import Success from "../authorize/Success";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function AuthorizeMember() {
  const {
    control,
    reset,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm({});
  const [value, setValue] = React.useState(0);
  const { image } = useAppSelector((state) => state.fingerPrint);
  const {
    data: { persons },
  } = useAppSelector((state) => state.authMember);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [signature, setSignature] = React.useState<any>("");
  const [isSignatureValid, setSignatureIsValid] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any>({ id: null });
  const dispatch = useAppDispatch();

  const isValid =
    (image && value === 1) || (value === 0 && isSignatureValid == true);
  const onReset = () => {
    reset();
    if (signature) {
      signature.clear();
      setSignatureIsValid(false);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onSubmit = async (data: any) => {
    let submitVerificationData: any = {
      id: selectedUser.id,
      verficationType: value === 0 ? 2 : value,
      requestCode: "test",
    };

    if (value === 0) {
      const signtureImage = signature?.toDataURL()?.split(",")?.[1];

      const data: any = {
        Data: {
          "إسم الطرف": selectedUser.name,
          الصفه: selectedUser.job,
        },
      };
      submitVerificationData.verficationImage = signtureImage;
      const res = await dispatch(generateQrCode({ data }));
      if (res.meta.requestStatus === "fulfilled")
        submitVerificationData.verficationQrImage = res.payload;
    }
    if (value === 1) {
      const data: any = {
        Data: {
          "إسم الطرف": selectedUser.name,
          الصفه: selectedUser.job,
        },
      };
      const res = await dispatch(generateQrCode({ data }));
      if (res.meta.requestStatus === "fulfilled")
        submitVerificationData.verficationQrImage = res.payload;
      submitVerificationData.verficationImage = image;
    }

    const result = await dispatch(
      submitJdPersonVerification({ data: submitVerificationData })
    );
    if (result.meta.requestStatus === "fulfilled") setIsSuccess(true);
  };

  const personList = persons.map((it) => (
    <Box
      onClick={() => {
        setIsSuccess(false);
        setSelectedUser(it);
      }}
      key={it.id}
      sx={{
        borderRadius: "8px",
        p: "14px 18px",
        backgroundColor: selectedUser.id === it.id ? "#077C5A" : "#96d4c24a",
        color: selectedUser.id === it.id ? "white" : "black",
        fontSize: "12px",
        fontWeight: "500",
        cursor: "pointer",
      }}
    >
      {it.name}
    </Box>
  ));

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        height: "100%",
        mt: "10px",
        p: "16px 30px",
      }}
    >
      <Box sx={{ display: "flex", gap: "20px", height: "100%" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "250px",
            flexShrink: 0,
            p: "16px",
            backgroundColor: "#F9F9F9",
          }}
        >
          <Box
            className="style_scroll_bar"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              mt: "20px",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            {personList}
          </Box>
        </Box>
        {isSuccess ? (
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Success />
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  indicatorColor="primary"
                  TabIndicatorProps={{
                    style: { height: "100%" },
                  }}
                  sx={{
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Tab
                    sx={{
                      backgroundColor: "#D9D9D9",
                      zIndex: "2",
                      "&.Mui-selected": {
                        backgroundColor: "transparent",
                        color: "#fff",
                      },
                    }}
                    label="التوقيع"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{
                      backgroundColor: "#D9D9D9",
                      zIndex: "2",
                      "&.Mui-selected": {
                        backgroundColor: "transparent",
                        color: "#fff",
                      },
                    }}
                    label="البصمة"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  disabled={!isValid || isSubmitting}
                  sx={{ p: "8px 25px", borderRadius: "8px" }}
                >
                  مصادقة
                </Button>
                <IconButton
                  onClick={() => onReset()}
                  sx={{
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 14px 0px #00000021",
                    color: "#000",
                  }}
                >
                  <svg
                    style={{ width: "20px", height: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                  >
                    <path
                      d="M19.9239 8.617C19.8481 8.43431 19.7199 8.27819 19.5554 8.16837C19.391 8.05854 19.1976 7.99995 18.9999 8H17.9409C17.7478 6.27324 17.059 4.63927 15.9577 3.29537C14.8564 1.95147 13.3896 0.955098 11.7344 0.426537C10.0792 -0.102023 8.30646 -0.140169 6.63008 0.316704C4.9537 0.773578 3.4454 1.70594 2.28729 3.00122C1.12918 4.2965 0.370765 5.89933 0.103609 7.61619C-0.163547 9.33305 0.0719787 11.0905 0.781751 12.6765C1.49152 14.2624 2.6452 15.609 4.10349 16.5536C5.56178 17.4983 7.26234 18.0006 8.99986 18C9.26508 18 9.51943 17.8946 9.70697 17.7071C9.8945 17.5196 9.99986 17.2652 9.99986 17C9.99986 16.7348 9.8945 16.4804 9.70697 16.2929C9.51943 16.1054 9.26508 16 8.99986 16C7.65774 16.0016 6.34347 15.6173 5.21361 14.8929C4.08376 14.1685 3.18597 13.1346 2.62719 11.9144C2.06842 10.6941 1.87222 9.33894 2.06197 8.0103C2.25173 6.68167 2.81944 5.43559 3.69747 4.42053C4.57549 3.40547 5.72682 2.66422 7.01428 2.2851C8.30173 1.90597 9.67104 1.90496 10.9591 2.28217C12.2471 2.65938 13.3995 3.39891 14.279 4.41267C15.1586 5.42642 15.7281 6.67165 15.9199 8H14.9999C14.8021 8.00004 14.6088 8.05871 14.4444 8.1686C14.28 8.27848 14.1519 8.43465 14.0762 8.61735C14.0005 8.80005 13.9807 9.00108 14.0193 9.19503C14.0578 9.38898 14.153 9.56715 14.2929 9.707L16.2929 11.707C16.4804 11.8945 16.7347 11.9998 16.9999 11.9998C17.265 11.9998 17.5193 11.8945 17.7069 11.707L19.7069 9.707C19.8468 9.56715 19.9421 9.38895 19.9807 9.19492C20.0194 9.0009 19.9996 8.79977 19.9239 8.617Z"
                      fill="black"
                    />
                  </svg>
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ height: "80%" }}>
              <CustomTabPanel index={0} value={value}>
                <DigitalSigntureInput
                  setIsValid={setSignatureIsValid}
                  signture={signature}
                  setSignture={setSignature}
                />
              </CustomTabPanel>
              <CustomTabPanel index={1} value={value}>
                <FingerPrintComponent
                  hideStatus={true}
                  status={"idle"}
                  control={control}
                />
              </CustomTabPanel>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={qrImg}
                style={{ width: "38px", height: "53px", objectFit: "contain" }}
              />
              <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>
                سوف يتم إدراج الكود الخاص بك علي ملف الضبط بعد تأكيد المصادقة
              </Typography>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
}
