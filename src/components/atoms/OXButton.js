import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

// 마일리지 승인 버튼
export function OXButton() {
    const [selectedButton, setSelectedButton] = useState(null);
  
    const handleButtonClick = (buttonNumber) => {
      if (selectedButton !== null || buttonNumber === selectedButton) {
        return;
      }
  
      setSelectedButton(buttonNumber);
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "3vh",
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: "100px",
            backgroundColor: selectedButton === 1 ? "#14BB38" : "#E3F8E8",
            "&:hover": {
              backgroundColor: selectedButton === 1 ? "#14BB38" : "#E3F8E8",
            },
          }}
          disabled={selectedButton === 2}
          onClick={() => handleButtonClick(1)}
        >
          {selectedButton === 1 || selectedButton === 2 ? (
            <CheckIcon sx={{ color: "#FFFFFF", fontSize: 30 }} />
          ) : (
            <CheckIcon sx={{ color: "#14BB38", fontSize: 30 }} />
          )}
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            marginLeft: 2,
            borderRadius: "100px",
            backgroundColor: selectedButton === 2 ? "#D54C48" : "#F2C7C6",
            "&:hover": {
              backgroundColor: selectedButton === 2 ? "#D54C48" : "#F2C7C6",
            },
          }}
          disabled={selectedButton === 1}
          onClick={() => handleButtonClick(2)}
        >
          {selectedButton === 1 || selectedButton === 2 ? (
            <ClearIcon sx={{ color: "#FFFFFF", fontSize: 30 }} />
          ) : (
            <ClearIcon sx={{ color: "#D54C48", fontSize: 30 }} />
          )}
        </Button>
      </Box>
    );
  }