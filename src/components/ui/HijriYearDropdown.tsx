import React, { ChangeEvent } from "react";
import moment from "moment-hijri";
import { Button, Menu, MenuItem } from "@mui/material";
import Fade from "@mui/material/Fade";
import { Controller } from "react-hook-form";
import { formatYear } from "../../utils/funcations";

interface HijriYearDropdownProps {
  control: any;
  name: string;
  children: any;
}

const HijriYearDropdown: React.FC<HijriYearDropdownProps> = ({
  control,
  name,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentYear: string = moment().format("iYYYY");
  const startYear = parseInt(currentYear, 10) - 100; // Adjust as needed
  const endYear = parseInt(currentYear, 10);

  const years: number[] = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(formatYear(year));
  }

  return (
    <>
      <Button
        id="fade-button"
        color="primary"
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px",
          borderRadius: "8px",
        }}
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75"
            stroke="#077C5A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {children}
        <svg
          style={{
            transform: `rotate(${open ? "180deg" : "0deg"})`,
            transition: "0.3s",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
        >
          <path
            d="M16.5 1.25L9 8.75L1.5 1.25"
            stroke="#077C5A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className={"style_scroll_bar"}
        sx={{
          maxHeight: "300px",
          "& .MuiPaper-root": {
            outline: "4px solid white",
            top: "238px !important",
            width: "100px",
            borderRadius: "8px",
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": {
              borderRadius: "16px",
              backgroundColor: "#23232326",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10px",
              background: "#077C5A",
            },
          },
        }}
      >
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <>
              {years.map((item: number) => (
                <MenuItem
                  key={item}
                  sx={{
                    justifyContent: "center",
                    backgroundColor: value === item ? "#077C5A1A" : undefined,
                  }}
                  onClick={() => {
                    onChange(item);
                    handleClose();
                  }}
                >
                  {item + " " + "هـ"}
                </MenuItem>
              ))}
            </>
          )}
        />
      </Menu>
    </>
  );
};

export default HijriYearDropdown;
