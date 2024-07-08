import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";

export default function SyncBtn({ onClick }: { onClick: () => void }) {
  const [inProgress, setInProgress] = useState(false);

  const handleOnClick = () => {
    setInProgress(true);
    onClick();
  };

  useEffect(() => {
    const timeId = setTimeout(() => setInProgress(false), 1000);

    return () => clearTimeout(timeId);
  }, [inProgress]);

  console.log(inProgress);

  return (
    <IconButton
      onClick={handleOnClick}
      sx={{
        width: "38px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        boxShadow: "0px 4px 14px 0px #00000021",
        color: "#000",
      }}
    >
      <svg
        style={{
          width: "24px",
          height: "24px",
          animationName: "rotate",
          animationDuration: "1000ms",
          animationFillMode: "forwards",
          animationIterationCount: "infinite",
          animationPlayState: inProgress ? "running" : "paused",
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </IconButton>
  );
}
