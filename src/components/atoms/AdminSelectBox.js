import { Select, MenuItem } from "@mui/material";

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
  