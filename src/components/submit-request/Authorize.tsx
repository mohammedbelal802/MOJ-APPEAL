import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DigitalSignatureInput from "../DigitalSigntureInput";
import FingerPrintComponent from "../FingerPrintComponent";
import { useAppSelector } from "../../store/hooks";

export default function Authorize({
  handleNextStep,
}: {
  handleNextStep: (data: any) => void;
}) {
  const [authType, setAuthType] = useState(1);
  const { image } = useAppSelector((state) => state.fingerPrint);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [isSignatureValid, setSignatureIsValid] = useState(false);

  const [signature, setSignature] = useState<any>("");
  const isValid =
    (image && authType === 2) || (authType === 1 && isSignatureValid == true);

  const onReset = () => {
    reset();

    if (signature) {
      signature.clear();
    }
  };

  const onSubmit = (data: any) => handleNextStep(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RadioGroup
        name={"authType"}
        onChange={(e) => setAuthType(+e.target.value)}
        value={authType}
        sx={{
          flexDirection: "row",
          columnGap: "70px",
          rowGap: "20px",
        }}
      >
        <FormControlLabel
          sx={{
            m: "0px",
            color: "#617696",
            "& .MuiTypography-root": {
              fontSize: "14px !important",
            },
          }}
          value="1"
          control={<Radio />}
          label="توقيع حي على الشاشة"
        />

        <FormControlLabel
          sx={{
            m: "0px",
            color: "#617696",
            "& .MuiTypography-root": {
              fontSize: "14px !important",
            },
          }}
          value="2"
          control={<Radio />}
          label="البصمة"
        />
      </RadioGroup>
      <Box
        sx={{
          width: "100%",
          height: "70vh",
          border: "0.8px solid #858B941A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          paddingTop: "55px",
          pb: "80px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "0px",
            right: "0px",
            p: "10px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            zIndex: "2",
          }}
        >
          <Button
            sx={{ p: "8px 30px 8px 30px", borderRadius: "30px" }}
            variant="contained"
            color="primary"
            disabled={!isValid}
            type="submit"
          >
            تأكيد
          </Button>

          <IconButton
            onClick={onReset}
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
        {authType === 1 && (
          <DigitalSignatureInput
            setIsValid={setSignatureIsValid}
            signture={signature}
            setSignture={setSignature}
          />
        )}

        {authType === 2 && (
          <FingerPrintComponent status={"idle"} control={control} />
        )}
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: "20px" }}
      >
        <Button
          type="button"
          sx={{
            px: "30px",
            borderRadius: "20px",
          }}
          variant="outlined"
          color="primary"
        >
          رجوع
        </Button>
        <Button
          type="submit"
          sx={{ px: "30px", borderRadius: "20px" }}
          disabled={!isValid}
          variant="contained"
          color="primary"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14.3491 1.64202C14.417 1.708 14.4647 1.7919 14.4868 1.88395C14.5089 1.976 14.5043 2.07243 14.4738 2.16202L10.1418 14.8287C10.1069 14.9307 10.0399 15.0187 9.95089 15.0796C9.86188 15.1404 9.75557 15.1709 9.64783 15.1664C9.5401 15.1619 9.4367 15.1227 9.35307 15.0546C9.26943 14.9865 9.21005 14.8933 9.18377 14.7887L7.59244 8.43335L1.2391 7.20335C1.13207 7.18266 1.03473 7.12756 0.96191 7.04644C0.889088 6.96532 0.844774 6.86262 0.835714 6.75399C0.826655 6.64535 0.853348 6.53673 0.911728 6.44467C0.970107 6.35261 1.05698 6.28215 1.1591 6.24402L13.8258 1.53135C13.9145 1.49835 14.0108 1.49123 14.1035 1.51082C14.1961 1.53041 14.2813 1.57591 14.3491 1.64202ZM3.17777 6.56002L8.09577 7.51202C8.18918 7.53009 8.27549 7.57445 8.34457 7.63987C8.41366 7.70529 8.46264 7.78906 8.48577 7.88135L9.7431 12.9047L13.1858 2.83668L3.17777 6.56002Z"
                fill="white"
              />
              <path
                d="M10.2431 5.76341C10.2895 5.80985 10.3264 5.86498 10.3515 5.92566C10.3767 5.98635 10.3896 6.05139 10.3896 6.11708C10.3896 6.18277 10.3767 6.24781 10.3515 6.3085C10.3264 6.36918 10.2895 6.42431 10.2431 6.47075L8.35773 8.35675C8.26393 8.45055 8.13672 8.50324 8.00407 8.50324C7.87142 8.50324 7.7442 8.45055 7.6504 8.35675C7.5566 8.26295 7.50391 8.13573 7.50391 8.00308C7.50391 7.87043 7.5566 7.74321 7.6504 7.64941L9.53573 5.76341C9.62948 5.66978 9.75657 5.61719 9.88907 5.61719C10.0216 5.61719 10.1493 5.66978 10.2431 5.76341Z"
                fill="white"
              />
            </svg>
          }
        >
          تقديم الطلب
        </Button>
      </Box>
    </form>
  );
}
