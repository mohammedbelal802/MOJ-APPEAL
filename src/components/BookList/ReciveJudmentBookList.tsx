import { Box, Button } from "@mui/material";

interface BOOK {
  bookNo: number;
  url: string;
}

export default function ReciveJudmentBookList({
  books,
}: {
  books: Array<BOOK>;
}) {
  const bookList = books.map((item: BOOK, index: number) => (
    <BookItem key={item.bookNo} book={item} index={index} />
  ));
  return (
    <Box
      className={"style-scroll-bar"}
      sx={{
        display: "flex",
        gap: "20px",
        p: "18px 15px",
        boxShadow: "0px 4px 19px 0px #4548520A",
        backgroundColor: "#fff",
        borderRadius: "4px",
        overflowX: "auto",
      }}
    >
      {bookList}
    </Box>
  );
}

const BookItem = ({ book, index }: { book: BOOK; index: number }) => (
  <Button
    onClick={() => {
      window.location.href = book.url;
    }}
    key={book.bookNo}
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
    color="primary"
    variant="text"
  >
    <svg
      style={{ width: "16px", height: "16px" }}
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
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
    {index === 0 ? "عرض صك الحكم" : "عرض باقي صك الحكم"}
  </Button>
);
