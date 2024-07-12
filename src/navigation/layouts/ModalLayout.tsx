import { Dialog } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function ModalLayout() {
  const modaalState = useAppSelector((state) => state.modal);
  if (!modaalState.open) {
    return <Navigate to={"/"} />;
  }

  return (
    <Dialog
      open={modaalState.open}
      fullWidth={true}
      maxWidth={"xl"}
      PaperProps={{
        sx: {
          backgroundColor: "#F8F9FB",
          width: { xs: "calc(100% - 10px)", md: "calc(100% - 64px)" },
          marginX: { xs: "0px", md: "32px" },
          height: "100%",
        },
      }}
    >
      <Outlet />
    </Dialog>
  );
}
