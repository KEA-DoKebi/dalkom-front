import * as React from "react";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function BasicDatePicker({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    if (onDateSelect && newValue) {
      // Day.js를 사용하여 날짜를 'YYYY-MM-DD' 형식으로 포맷합니다.
      const formattedDate = newValue.format("YYYY-MM-DD");
      onDateSelect(formattedDate); // 포맷된 날짜 문자열을 외부로 전달합니다.
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="입사일을 입력하세요"
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ width: "525.6px", height: "65px" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
