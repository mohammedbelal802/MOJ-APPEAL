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
  handlePrevStep,
}: {
  handleNextStep: (data: any) => void;
  handlePrevStep: (data: any) => void;
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
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          paddingTop: "0px",
          pb: "0px",
        }}
      >
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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "20px",
          position: "sticky",
          bottom: "0px",
          left: "0px",
          width: "100%",
          backgroundColor: "#f8f9fb",
          p: "10px",
        }}
      >
        <Button
          type="button"
          onClick={handlePrevStep}
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
