import { Button } from "@mui/material";

export default function PrimaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button onClick={onClick} fullWidth variant="contained" color="primary">
      {children}
    </Button>
  );
}
