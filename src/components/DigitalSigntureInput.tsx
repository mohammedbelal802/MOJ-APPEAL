import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function DigitalSignatureInput({
  setSignture,
  setIsValid,
}: {
  signture: string;
  setSignture: (item: any) => void;
  setIsValid: (status: boolean) => void;
}) {
  const signatureRef = useRef<any>(null);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = signatureRef.current.getCanvas();
      const parentWidth = canvas.parentElement.clientWidth;
      const parentHeight = canvas.parentElement.clientHeight;

      canvas.height = parentHeight;
      canvas.width = parentWidth;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        aspectRatio: "800/350",
        maxHeight: "350px",
        m: "auto",
      }}
      className="digital-signture"
    >
      <SignatureCanvas
        backgroundColor="#fff"
        ref={(ref) => {
          setSignture(ref);
          signatureRef.current = ref;
        }}
        onEnd={() => setIsValid(true)}
      />
    </Box>
  );
}
