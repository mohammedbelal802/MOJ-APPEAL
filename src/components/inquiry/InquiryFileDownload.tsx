import { Button } from "@mui/material";
import { apiClient } from "../../api";
import { FILE_PROPS } from "../../utils/types";
import { useState } from "react";

export default function InquiryFileDownload({ item }: { item: FILE_PROPS }) {
  const [isLoading, setIsLoading] = useState(false);

  const onFileClick = async (docId: string, fileName: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post(`/get-file?documentId=${docId}`, {
        documnetId: docId,
      });
      setIsLoading(false);

      const byteCharacters = atob(response.data);

      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: "application/octet-stream",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={() => onFileClick(item.fileSharepointId, item.fileName)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "#33964D",
        color: "white",
      }}
      color="primary"
      variant="contained"
    >
      <img
        src={require("../../assets/download.png")}
        style={{ width: "24px", aspectRatio: "1/1", objectFit: "contain" }}
      />
      تحميل
    </Button>
  );
}
