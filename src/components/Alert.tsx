import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, Typography } from "@mui/material";
interface props {
  open: boolean;
  handleClose: () => void;
  title: string;
  message: string;
  firstBtn: { text: string; color: any; variant: any };
  secondBtn: { text: string; color: any; variant: any };
  onSubmit: () => void;
  icon?: any;
  iconBgColor: any;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Alert({
  open,
  title,
  message,
  firstBtn,
  secondBtn,
  icon,
  handleClose,
  onSubmit,
}: props) {
  const [isLoading, setIsloading] = React.useState(false);

  const onActionTake = async () => {
    setIsloading(true);
    await onSubmit();
    setIsloading(false);
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth={"xs"}
        fullWidth={true}
        open={open}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            backgroundColor: "#fff",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            gap: "15px",
            padding: {
              xs: "32px 22px !important",
              md: "32px 22px !important",
            },
          }}
        >
          <Box
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#FEE4E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: "0",
            }}
          >
            {icon ?? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.375 3.73281V3.89974C13.3492 3.98709 14.3195 4.11269 15.2835 4.27624C15.3563 4.2886 15.4259 4.31489 15.4883 4.35362C15.5507 4.39235 15.6047 4.44276 15.6473 4.50196C15.6899 4.56116 15.7201 4.628 15.7363 4.69866C15.7525 4.76933 15.7544 4.84243 15.7418 4.91379C15.7291 4.98515 15.7023 5.05338 15.6628 5.11458C15.6233 5.17579 15.5719 5.22876 15.5115 5.27048C15.4512 5.3122 15.383 5.34185 15.3109 5.35774C15.2388 5.37363 15.1643 5.37545 15.0915 5.36309L14.9348 5.33735L14.181 14.9484C14.1375 15.5026 13.8824 16.0202 13.4665 16.3979C13.0506 16.7755 12.5046 16.9853 11.9378 16.9853H6.063C5.49615 16.9853 4.9502 16.7755 4.5343 16.3979C4.1184 16.0202 3.86321 15.5026 3.81975 14.9484L3.06525 5.33735L2.9085 5.36309C2.83572 5.37545 2.76116 5.37363 2.6891 5.35774C2.61703 5.34185 2.54885 5.3122 2.48847 5.27048C2.36653 5.18622 2.28372 5.05791 2.25825 4.91379C2.23279 4.76966 2.26677 4.62152 2.35271 4.50196C2.43865 4.3824 2.56951 4.3012 2.7165 4.27624C3.68045 4.11249 4.65074 3.98689 5.62501 3.89974V3.73281C5.62501 2.58272 6.53475 1.60029 7.73701 1.56279C8.57904 1.53636 9.42172 1.53636 10.2638 1.56279C11.466 1.60029 12.375 2.58272 12.375 3.73281ZM7.77301 2.66508C8.59105 2.63943 9.40971 2.63943 10.2278 2.66508C10.7925 2.68273 11.25 3.14894 11.25 3.73281V3.81591C9.75139 3.72667 8.24862 3.72667 6.75 3.81591V3.73281C6.75 3.14894 7.20676 2.68273 7.77301 2.66508ZM7.50675 7.03675C7.5039 6.96433 7.48652 6.89316 7.45561 6.82732C7.42471 6.76148 7.38088 6.70225 7.32662 6.65302C7.27237 6.60379 7.20876 6.56551 7.13942 6.54039C7.07008 6.51526 6.99637 6.50376 6.9225 6.50656C6.84864 6.50936 6.77605 6.5264 6.7089 6.55671C6.64175 6.58701 6.58134 6.62999 6.53113 6.68318C6.48092 6.73637 6.44188 6.79874 6.41625 6.86672C6.39062 6.93471 6.3789 7.00698 6.38175 7.0794L6.642 13.6976C6.64777 13.8438 6.71253 13.9817 6.82203 14.0811C6.87624 14.1303 6.93982 14.1685 7.00911 14.1936C7.0784 14.2187 7.15206 14.2302 7.22588 14.2274C7.2997 14.2246 7.37223 14.2076 7.43934 14.1773C7.50645 14.147 7.56681 14.1041 7.61699 14.0509C7.66717 13.9977 7.70618 13.9354 7.73179 13.8675C7.7574 13.7995 7.76911 13.7273 7.76625 13.6549L7.50675 7.03675ZM11.6168 7.0794C11.6223 7.00559 11.6125 6.93144 11.5882 6.86138C11.5639 6.79132 11.5254 6.72678 11.4751 6.67161C11.4247 6.61643 11.3636 6.57176 11.2953 6.54023C11.227 6.50871 11.1529 6.49099 11.0775 6.48813C11.0021 6.48526 10.9268 6.49732 10.8563 6.52357C10.7857 6.54982 10.7212 6.58973 10.6667 6.64092C10.6122 6.69211 10.5687 6.75354 10.5389 6.82155C10.5091 6.88955 10.4936 6.96274 10.4933 7.03675L10.233 13.6549C10.2272 13.8012 10.281 13.9437 10.3824 14.0512C10.4838 14.1586 10.6246 14.2221 10.7738 14.2278C10.9229 14.2334 11.0683 14.1807 11.1779 14.0813C11.2874 13.9819 11.3522 13.8439 11.358 13.6976L11.6168 7.0794Z"
                  fill="#EE404C"
                />
              </svg>
            )}
          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: "18px",
                fontWeight: "400",
                color: "#101828",
                mb: "15px",
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#667085" }}
            >
              {message}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            padding: {
              xs: "22px 22px !important",
              md: "22px 59px !important",
            },
            gap: "12px",
          }}
        >
          <Button
            onClick={onActionTake}
            color={firstBtn.color}
            variant={firstBtn.variant}
            sx={{ borderRadius: "50px" }}
            fullWidth={true}
            disabled={isLoading}
          >
            {firstBtn.text}
          </Button>

          <Button
            onClick={handleClose}
            color={secondBtn.color}
            variant={secondBtn.variant}
            fullWidth={true}
            sx={{ borderRadius: "50px" }}
          >
            {secondBtn.text}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
