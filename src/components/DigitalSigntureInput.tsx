import { Box } from "@mui/material";

import SignatureCanvas from "react-signature-canvas";

export default function DigitalSigntureInput({
  setSignture,
  setIsValid,
}: {
  signture: string;
  setSignture: (item: any) => void;
  setIsValid: (status: boolean) => void;
}) {
  return (
    <Box
      sx={{
        // width: "1250px",
        // height: "350px",
        display: "flex",
        justifyContent: "center",
        // border: "1px solid #858b9480",
        mx: "auto",
      }}
      className="digital-signture"
    >
      <SignatureCanvas
        backgroundColor="#fff"
        ref={(ref) => setSignture(ref)}
        onEnd={() => setIsValid(true)}
        // canvasProps={{ width: "975px", height: "350px" }}
      />
    </Box>
  );
}
