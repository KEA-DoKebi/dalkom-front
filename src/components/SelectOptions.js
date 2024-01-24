import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOptions() {
  const [option, setOption] = React.useState('');

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <FormControl sx={{ width: "350px", minHeight: "10px", marginTop: '50px', marginBottom: '80px'  }}>
      <InputLabel id="select-small-label">옵션을 선택해주세요</InputLabel>
      <Select
        labelId="select-small-label"
        id="demo-select-small"
        value={option}
        label="옵션을 선택해주세요"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>옵션1</em>
        </MenuItem>
        <MenuItem value={10}>옵션2</MenuItem>
        <MenuItem value={20}>옵션3</MenuItem>
        <MenuItem value={30}>옵션4</MenuItem>
      </Select>
    </FormControl>
  );
}