import { Box } from "@mui/material";

import SignatureCanvas from "react-signature-canvas";

export default function DigitalSigntureInput({
  setSignture,
}: {
  signture: string;
  setSignture: (item: any) => void;
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
        // canvasProps={{ width: "975px", height: "350px" }}
      />
    </Box>
  );
}
