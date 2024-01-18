import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/system';

// 커스텀 스타일이 적용된 Switch
const StyledSwitch = styled(Switch)({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FFBABB', // 원하는 색상으로 변경
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#ffffff', // 원하는 밝은 색상으로 변경
  },
});

// 부모 컴포넌트에 오른쪽 정렬 스타일 추가
const StyledFormControlLabel = styled(FormControlLabel)({
  display: 'flex',
  justifyContent: 'flex-end',
});

export default function StyledSwitchLabels() {
  const [isAdminMode, setIsAdminMode] = React.useState(false);

  const handleChange = () => {
    setIsAdminMode(!isAdminMode);
  };

  return (
    <StyledFormControlLabel
      control={<StyledSwitch checked={isAdminMode} onChange={handleChange} />}
      label={isAdminMode ? "관리자 모드" : "사용자 모드"}
    />
  );
}
