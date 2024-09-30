import { Box, Button, Fade, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

interface BOOK {
  bookNo: number | null;
  url: string;
}

export default function BookList({
  books,
  placeholder,
}: {
  books: Array<BOOK>;
  placeholder?: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedBook, setSelectedBook] = useState<BOOK>({
    bookNo: null,
    url: "",
  });
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const bookList = books.map((item: BOOK, index: number) => (
    <MenuItem
      key={item.bookNo}
      sx={{
        justifyContent: "center",
        backgroundColor:
          selectedBook.bookNo === item.bookNo ? "#077C5A1A" : undefined,
      }}
      onClick={() => {
        setSelectedBook(item);
        handleClose();
      }}
    >
      صفحة {index + 1}
    </MenuItem>
  ));
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <Button
        sx={{ py: "6px !important", borderRadius: "8px" }}
        id="fade-button"
        color="secondary"
        variant="outlined"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {selectedBook.bookNo || "إختر الصفحة"}
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
            top: "142px !important",
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
        {bookList}
      </Menu>

      <Button
        color="primary"
        variant="text"
        sx={{
          width: "fit-content",
          fontWeight: "500",
          px: "20px",
          backgroundColor: "#F5F8FA",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#000",
        }}
        onClick={() => {
          if (!selectedBook.bookNo) return;
          window.location.href = selectedBook.url;
        }}
      >
        {placeholder || "عرض"}
      </Button>
    </Box>
  );
}
