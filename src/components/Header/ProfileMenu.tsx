import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ProfileCard from "../ProfileCard";
export default function ProfileMenu() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [profileMenuOpen, setProfileOpen] = useState(false);
  const toggleProfileMenu = () => setProfileOpen((prev) => !prev);

  const handleOutSideClick = (event: any) => {
    if (menuRef.current && menuRef?.current?.contains(event.target as Node)) {
    } else {
      setProfileOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutSideClick);
    return () => window.removeEventListener("click", handleOutSideClick);
  }, []);
  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <Box
        onClick={toggleProfileMenu}
        sx={{
          cursor: "pointer",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px 12px",
          width: "fit-content",
          height: "40px",
          borderRadius: "26px",
          backgroundColor: "#FFFFFF12",
          gap: "10px",
        }}
      >
        <Typography
          sx={{
            color: "#FFF",
            fontSize: "20",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "24px",
            display: { xs: "none", md: "block" },
            whiteSpace: "nowrap",
          }}
        >
          محمد عبد الله
        </Typography>
        <svg
          style={{
            width: "16px",
            height: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
        <Box
          sx={{
            maxWidth: 32,
            maxHeight: 32,
            borderRadius: "50%", // To make it circular
            overflow: "hidden", // To handle overflow due to borderRadius
          }}
        >
          <svg
            style={{
              width: "24px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </Box>
      </Box>

      {profileMenuOpen && <ProfileCard />}
    </div>
  );
}
