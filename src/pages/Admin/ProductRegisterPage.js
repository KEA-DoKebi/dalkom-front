import React, { useEffect, useState } from "react";
import AdminBar from "../../components/AdminBar";
import {
  Paper,
  Box,
  Toolbar,
  Grid,
  Typography,
  styled,
  Switch,
  alpha,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { InputBoxXS, InputBoxM, AdminButton } from "../../components/AdminComponents";

const ProductRegisterPage = () => {
  // Declare selectedMenu and setSelectedMenu using useState
  const [selectedMenu, setSelectedMenu] = useState("상품 등록");

  const [selectedOption, setSelectedOption] = useState("");
  const options = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      // Add more options as needed
    ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png");

  
  const onUpload = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      setSelectedImage(file);
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        setImagePreview(reader.result);
      };
    }
  };
  

  useEffect(() => {
    // 각 페이지가 마운트될 때 selectedMenu를 업데이트
    // setSelectedMenu 함수를 호출하여 상태를 업데이트
    setSelectedMenu("상품 등록");
  }, []);

  const PinkSwitch = styled(Switch)(({ theme }) => ({
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

  const CustomSelect = ({ options, onChange, value, size, sx }) => {
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


  return (
    <Paper sx={{ display: "flex", height: "100vh" }}>
      {/* AdminBar 컴포넌트에 selectedMenu와 setSelectedMenu props 전달 */}
      <AdminBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "#EEF2F6",
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Box
          component="main"
          justifyContent="center"
          alignItems="center"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            borderRadius: "27px",
            margin: "16px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="photo-upload"
                  type="file"
                  onChange={onUpload}
                />
                <label htmlFor="photo-upload">
                  <AdminButton variant="contained">첨부하기</AdminButton>
                </label>
              </div>
            </Grid>
            <Grid item xs={7}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ width: '10%', mr : 2 }}>
                  카테고리
                </Typography>
                <CustomSelect 
                  options={options} 
                  value={selectedOption}
                  onChange size="m"
                  sx={{ mr : 6 }} />
                <CustomSelect 
                  options={options} 
                  value={selectedOption}
                  onChange size="m"
                  sx={{ mr : 6 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ width: '10%', mb : 4, mr : 2 }}>
                  이름
                </Typography>
                <InputBoxM
                  color="neutral"
                  disabled={false}
                  placeholder="이름"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ width: '10%',  mb : 4, mr : 2 }}>
                  제조사
                </Typography>
                <InputBoxM
                  color="neutral"
                  disabled={false}
                  placeholder="제조사"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ width: '10%', mb : 4, mr : 2 }}>
                  가격
                </Typography>
                <InputBoxM
                  color="neutral"
                  disabled={false}
                  placeholder="가격"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px'}}>
                <Typography variant="h6" fontWeight="bold" sx={{ width: '10%', mr : 3 }}>
                  옵션
                </Typography>
                <PinkSwitch sx={{ mr : 5 }} />
                <CustomSelect 
                  options={options} 
                  value={selectedOption}
                  onChange size="s"
                  sx={{ mr : 5 }} />
                <CustomSelect 
                  options={options}
                  value={selectedOption}
                  onChange size="s"
                  sx={{ mr : 5 }} />
                <InputBoxXS
                  color="neutral"
                  disabled={false}
                  placeholder="수량"
                  variant="soft"
                />
                
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ width: '10%', mr : 2 }}>
                  판매여부
                </Typography>
                <FormControl>
                  <RadioGroup row name="use-radio-group" defaultValue="Y" >
                    <FormControlLabel value="Y" control={<Radio size="large" sx={{color: pink[800], '&.Mui-checked': { color: pink[600] }}}/>} label="판매중" />
                    <FormControlLabel value="N" control={<Radio size="large" sx={{color: pink[800], '&.Mui-checked': { color: pink[600] }}}/>} label="판매중단" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ width: '10%', mb : 4, mr : 2 }}>
                  상세설명
                </Typography>
                <InputBoxM
                  color="neutral"
                  disabled={false}
                  placeholder="상세설명 에디터"
                  variant="soft"
                  sx={{ mb: 4 }}
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductRegisterPage;
