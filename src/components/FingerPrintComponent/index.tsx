import { Box, Typography } from "@mui/material";
import RightHand from "./RightHand";
import LeftHand from "./LeftHand";
import FingerPrintCapture from "../FingerPrintCapture";
import error from "../../assets/error.png";
import success from "../../assets/success.png";

export default function FingerPrintComponent({
  control,
  status,
}: {
  control: any;
  status: any;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "50vh",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <FingerPrintCapture />
      <Box
        sx={{
          display: "flex",
          gap: "50px",
          alignItems: "end",
        }}
      >
        <RightHand control={control} />
        <LeftHand control={control} />
      </Box>

      <Box
        sx={{
          width: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {status === "error" && (
          <>
            {" "}
            <img
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "contain",
              }}
              src={error}
            />
            <Typography sx={{ textAlign: "center" }}>
              تم التحقق،
              <br /> البصمة غير مطابقة
            </Typography>
          </>
        )}
        {status === "success" && (
          <>
            <img
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "contain",
              }}
              src={success}
            />
            <Typography sx={{ textAlign: "center" }}>
              تم التحقق،
              <br /> البصمة مطابقة
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
