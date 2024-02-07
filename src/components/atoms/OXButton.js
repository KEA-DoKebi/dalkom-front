import React, { useState } from "react";
import { Box } from "@mui/system";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export function OXButton({ onSelect }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonNumber) => {
    if (selectedButton === buttonNumber) return;

    setSelectedButton(buttonNumber);
    onSelect(buttonNumber === 1 ? "Y" : "N");
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {selectedButton === 1 ? (
        <CheckCircleRoundedIcon
          sx={{ color: "#B6DEDE", fontSize: 30, cursor: "pointer" }}
          onClick={() => handleButtonClick(1)}
        />
      ) : (
        <CheckCircleOutlineRoundedIcon
          sx={{ color: "#B6DEDE", fontSize: 30, cursor: "pointer" }}
          onClick={() => handleButtonClick(1)}
        />
      )}
      {selectedButton === 2 ? (
        <CancelRoundedIcon
          sx={{
            color: "#F4B5C2",
            fontSize: 30,
            cursor: "pointer",
            marginLeft: 1,
          }}
          onClick={() => handleButtonClick(2)}
        />
      ) : (
        <HighlightOffRoundedIcon
          sx={{
            color: "#F4B5C2",
            fontSize: 30,
            cursor: "pointer",
            marginLeft: 1,
          }}
          onClick={() => handleButtonClick(2)}
        />
      )}
    </Box>
  );
}
