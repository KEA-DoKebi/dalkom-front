import { Switch, alpha } from "@mui/material";
import { pink } from "@mui/material/colors";
import styled from "styled-components";

// On/Off 스위치 - (OnOffSwitch) 가져다가 쓰면 됩니당
export const PinkSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600]),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
  // 비활성화 상태에서도 체크되어 있으면 핑크색으로 표시
  "& .MuiSwitch-switchBase.Mui-disabled.Mui-checked": {
    color: pink[600],
  },
  "& .MuiSwitch-switchBase.Mui-disabled.Mui-checked + .MuiSwitch-track": {
    backgroundColor: alpha(pink[600], 0.5), // 비활성화 상태에서의 트랙 색상
  },
}));

export function OnOffSwitch({checked, onChange, sx, disabled}) {
  return (
    <div>
      <PinkSwitch checked={checked} onChange={onChange} disabled={disabled} sx={sx} />
    </div> 
  );
}
