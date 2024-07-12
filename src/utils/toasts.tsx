import toast from "react-hot-toast";

export const warningToast = (message: string) =>
  toast(
    (t) => (
      <span style={{ display: "flex", alignItems: "center", color: "#FF5263" }}>
        {message}
        <svg
          role="button"
          onClick={() => toast.dismiss(t.id)}
          style={{
            width: "15px",
            height: "15px",
            flexShrink: "0",
            cursor: "pointer",
            color: "#FF5263",
            marginInlineStart: "10px",
            display: "block",
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </span>
    ),
    {
      icon: (
        <svg
          style={{
            width: "20px",
            height: "20px",
            flexShrink: "0",
            cursor: "pointer",
            color: "#FF5263",
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      duration: 5000,
    }
  );

export const successToast = (message: string) => toast.success(message);
