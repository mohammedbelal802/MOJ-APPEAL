import { Box, Button, Typography } from "@mui/material";
import logo from "../../assets/authlogo.svg";
import { useNavigate } from "react-router-dom";
export default function ProfileCard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <Box
      sx={{
        position: "absolute",
        left: "0px",
        top: "160%",
        width: "300px",
        boxShadow: "2px 20px 40px 0px #077C5A12",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ height: "100px", backgroundColor: "#067C5A", p: "12px" }}>
        <img
          src={logo}
          style={{ width: "34px", height: "42px", objectFit: "contain" }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "50px 20px 20px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "0px",
            transform: "translate(-50%,-50%)",
            width: "80px",
            height: "80px",
          }}
        >
          <svg
            style={{ width: "100%", height: "100%" }}
            xmlns="http://www.w3.org/2000/svg"
            width="87"
            height="87"
            viewBox="0 0 87 87"
            fill="none"
          >
            <g clip-path="url(#clip0_296_1258)">
              <path
                d="M30.5537 68.2081L17.5743 75.2879C16.8277 75.7042 16.1292 76.2013 15.4912 76.7702C23.3218 83.3889 33.2472 87.014 43.5003 87.0001C54.0946 87.0001 63.8008 83.2082 71.3469 76.9146C70.6482 76.3139 69.8799 75.7991 69.0586 75.3815L55.1599 68.433C54.2795 67.9928 53.539 67.3161 53.0215 66.4788C52.504 65.6415 52.2299 64.6766 52.2298 63.6923V58.2392C52.6205 57.7943 53.067 57.2231 53.5447 56.5484C55.42 53.8833 56.877 50.9472 57.8651 47.8419C59.6478 47.292 60.961 45.6455 60.961 43.6888V37.8681C60.961 36.5877 60.3914 35.4435 59.5066 34.6425V26.2281C59.5066 26.2281 61.2352 13.1338 43.5019 13.1338C25.7687 13.1338 27.4972 26.2281 27.4972 26.2281V34.6425C27.0418 35.0478 26.677 35.5446 26.4264 36.1003C26.1758 36.6561 26.0451 37.2584 26.0428 37.8681V43.6888C26.0428 45.222 26.8488 46.5713 28.0553 47.3511C29.5097 53.6824 33.318 58.2392 33.318 58.2392V63.5577C33.3168 64.5095 33.0595 65.4435 32.5731 66.2617C32.0868 67.0799 31.3893 67.7522 30.5537 68.2081Z"
                fill="#E7ECED"
              />
              <path
                d="M44.2435 0.00647766C20.2233 -0.4039 0.416859 18.7361 0.00648195 42.7563C-0.226612 56.3759 5.84369 68.6166 15.5089 76.7569C16.1409 76.1936 16.8328 75.7015 17.5723 75.2894L30.5517 68.2096C31.3877 67.7535 32.0854 67.0806 32.5715 66.2617C33.0576 65.4429 33.3142 64.5082 33.3144 63.5559V58.2374C33.3144 58.2374 29.5044 53.6806 28.0517 47.3493C27.4368 46.9557 26.9305 46.4143 26.5789 45.7745C26.2273 45.1348 26.0418 44.417 26.0392 43.687V37.8663C26.0392 36.5859 26.6088 35.4417 27.4936 34.6407V26.2263C27.4936 26.2263 25.765 13.132 43.4983 13.132C61.2315 13.132 59.503 26.2263 59.503 26.2263V34.6407C60.3894 35.4417 60.9574 36.5859 60.9574 37.8663V43.687C60.9574 45.6437 59.6442 47.2902 57.8615 47.8401C56.8734 50.9454 55.4164 53.8815 53.541 56.5466C53.0634 57.2213 52.6169 57.7925 52.2262 58.2374V63.6905C52.2262 65.698 53.3605 67.5349 55.1563 68.4312L69.0549 75.3797C69.8736 75.7972 70.6395 76.3108 71.3366 76.9096C80.7097 69.0927 86.7652 57.4051 86.9901 44.2435C87.4037 20.2233 68.2654 0.416855 44.2435 0.00647766Z"
                fill="#556080"
              />
            </g>
            <defs>
              <clipPath id="clip0_296_1258">
                <rect width="87" height="87" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>

        <Typography sx={{ color: "#242934", fontWeight: "400" }}>
          محمد عبدالله احمد الدوسري
        </Typography>

        <Typography sx={{ color: "#242934", fontWeight: "400" }}>
          mohamed.abdullah
        </Typography>

        <Button
          onClick={handleLogout}
          fullWidth
          color="warning"
          variant="text"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "500",
            fontSize: "12px",
            gap: "10px",
          }}
        >
          <svg
            style={{ width: "24px", height: "24px" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#EE4F4F"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          تسجيل الخروج
        </Button>
      </Box>
    </Box>
  );
}
