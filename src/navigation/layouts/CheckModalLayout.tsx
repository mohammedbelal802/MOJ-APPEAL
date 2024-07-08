import { Dialog } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { hide } from "../../store/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function CheckModalLayout() {
  const modaalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const onHide = () => {
    dispatch(hide());
  };
  if (!modaalState.open) {
    return <Navigate to={"/"} />;
  }

  return (
    <Dialog
      onClose={onHide}
      open={modaalState.open}
      fullWidth={true}
      maxWidth={"sm"}
      PaperProps={{
        sx: {
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FB 100%)",
          width: { xs: "calc(100% - 10px)", md: "calc(100% - 64px)" },
          marginX: { xs: "0px", md: "32px" },
        },
      }}
    >
      <Outlet />
    </Dialog>
  );
}
