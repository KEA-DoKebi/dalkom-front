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
}));

export function OnOffSwitch() {
  return (
    <div>
      <PinkSwitch />
    </div>
  );
}
