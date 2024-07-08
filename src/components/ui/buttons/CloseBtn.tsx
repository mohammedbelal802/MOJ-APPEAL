import { IconButton } from "@mui/material";

interface props {
  onClick: () => void;
}

export default function CloseBtn({ onClick }: props) {
  return (
    <IconButton onClick={onClick}>
      <svg
        style={{ width: "24px", height: "24px" }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#000"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </IconButton>
  );
}
