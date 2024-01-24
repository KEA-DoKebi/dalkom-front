import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

// 모달창 예시) <Modal size="M" open={true} onClose={handleClose} title="Custom Title" contents="Custom Contents" />
export const Modal = ({ size, open, onClose, title, contents }) => {
  const [content, setContent] = useState(contents || "");

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleClose = () => {
    onClose();
    setContent("");
  };

  const handleSubmit = () => {
    console.log("Submitting modal content:", content);
    handleClose();
  };

  const modalDimensions =
    size === "S"
      ? { width: 600, height: 200 }
      : size === "M"
        ? { width: 800, height: 400 }
        : size === "L"
          ? { width: 1200, height: 800 }
          : { width: 600, height: 200 };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="false">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent style={modalDimensions}>
        <textarea
          value={content}
          onChange={handleContentChange}
          style={{ width: "100%", height: "100%" }}
        />
      </DialogContent>
      <Button onClick={handleSubmit}>Submit</Button>
    </Dialog>
  );
};
