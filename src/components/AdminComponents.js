// ButtonAndInput.js
import React, { useState } from "react";
import { Box } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Input } from "@mui/joy";
import {
  Button,
  Switch,
  alpha,
  styled,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  Stack,
  Alert,
  Chip,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
        height: "100vh",
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

// On/Off 스위치 - (OnOffSwitch) 가져다가 쓰면 됩니당
export const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

export function OnOffSwitch() {
  return (
    <div>
      <PinkSwitch defaultChecked />
    </div>
  );
}

// 페이지네이션
export default function BasicPagination() {
  return <Pagination count={10} />;
}

export const InputBoxXS = styled(Input)`
  width: 210px;
  height: 50px;
`;

export const InputBoxS = styled(Input)`
  width: 520px;
  height: 50px;
`;

export const InputBoxM = styled(Input)`
  width: 820px;
  height: 50px;
`;

export const InputBoxL = styled(Input)`
  width: 1060px;
  height: 50px;
`;

export const InputBoxXL = styled(Input)`
  width: 960px;
  height: 140px;
`;

//공통 버튼
export const AdminButton = styled(Button)`
  background-color: #fce8ef;
  color: #ec407a;
  width: 124px;
  height: 46px;
  text-align: center;
  font-weight: 500;
  line-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #fce8ef;
    color: #ec407a;
  }

  &:active {
    color: #ffffff;
    background-color: #e42a5d;
  }
`;

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

// 선택창
// sx 추가 - margin 적용 시 입력
export const CustomSelect = ({ options, onChange, value, size, sx }) => {
  const getSizeStyles = (size) => {
    switch (size) {
      case "s":
        return { height: "50px", width: "210px" };
      case "m":
        return { height: "50px", width: "330px" };
      case "l":
        return { height: "50px", width: "650px" };
      default:
        return { height: "50px", width: "100%" };
    }
  };

  const selectStyle = getSizeStyles(size);

  return (
    <Select value={value} onChange={onChange} style={selectStyle} sx={sx}>
      {options &&
        options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </Select>
  );
};

// select 상자 예시 입니당
// const [selectedOption, setSelectedOption] = useState("");
// const options = [
//   { label: "Option 1", value: "option1" },
//   { label: "Option 2", value: "option2" },
//   // Add more options as needed
// ];
// <CustomSelect options={options} value={selectedOption} onChange={handleOptionChange} size="s" />

// 알람
export const CustomAlerts = ({ alerts }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {alerts.map((alert, index) => (
        <Alert key={index} severity={alert.severity}>
          {alert.message}
        </Alert>
      ))}
    </Stack>
  );
};

// 알람 예시 입니당
// const customAlerts = [
//   { severity: 'success', message: 'Custom success message.' },
//   { severity: 'info', message: 'Custom info message.' },
//   { severity: 'warning', message: 'Custom warning message.' },
//   { severity: 'error', message: 'Custom error message.' },
// ];
// <CustomAlerts alerts={customAlerts} />

// 대기 / 완료 Chip 입니당
export const MuiColorChip = ({ status }) => {
  const getColor = (status) => {
    switch (status) {
      case "waiting":
        return "warning";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Stack spacing={1} alignItems="center">
      <Chip label={status} color={getColor(status)} variant="outlined" />
    </Stack>
  );
};

// 사용 예시
// const waitingStatus = 'waiting';
// const completedStatus = 'completed';
// <MuiColorChip status={waitingStatus} />


// CKEditor
export const CKEditorComponent = () => {
  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleEditorChange}
      />
    </div>
  );
};
