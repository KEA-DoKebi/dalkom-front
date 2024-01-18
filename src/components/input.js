// InputField.js

import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

const InputField = ({ Label, Text }) => {
  return (
    <FormControl>
      <FormLabel>{Label}</FormLabel>
      <Input placeholder={Text} sx={{width: "500px", height: "50px"}}/>
    </FormControl>
  );
};

export default InputField