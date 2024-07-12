import { Box } from "@mui/material";
import RightHand from "./RightHand";
import LeftHand from "./LeftHand";
import FingerPrintCapture from "../FingerPrintCapture";

export default function FingerPrintComponent({ control }: { control: any }) {
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
    </Box>
  );
}
