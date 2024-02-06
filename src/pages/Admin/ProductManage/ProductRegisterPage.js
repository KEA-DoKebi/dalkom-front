import React, { useEffect, useState } from "react";
import AdminBar from "components/organisms/AdminBar";
import {
  Paper,
  Box,
  Toolbar,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { InputBoxXS, InputBoxM } from "components/atoms/Input";

import { AdminButton } from "components/atoms/AdminCommonButton";
import { PinkSwitch } from "components/atoms/OnOffSwitch";
import { useForm, Controller } from "react-hook-form";
import { TokenAxios } from "apis/CommonAxios";
import AWS from "aws-sdk";
import EditorComponent from "components/atoms/Editor";
import Swal from "sweetalert2";

const ProductRegisterPage = () => {

  // env 파일 변수로 설정
  const REACT_APP_AWS_S3_BUCKET_REGION = process.env.REACT_APP_AWS_S3_BUCKET_REGION;
  const REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID = process.env.REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID;
  const REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY;
  const REACT_APP_AWS_S3_STORAGE_BUCKET_NAME = process.env.REACT_APP_AWS_S3_STORAGE_BUCKET_NAME;

  // react-hook-form에 필요한 메소드들
  const { control, register, handleSubmit, setValue, trigger } = useForm();

  // useState들 선언
  const [selectedMenu, setSelectedMenu] = useState("상품 등록");
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [subOptionList, setSubOptionList] = useState([]);
  const [productImage, setProductImage] = useState("https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png");

  

  // 상위 카테고리 API 
  const getCategoryList = async() => {
    const res = await TokenAxios.get(`/api/category`);
    console.log(res.data);
    setCategoryList(res.data.result.data);
  }

  // 하위 카테고리 API
  const getSubCategoryList = async(categorySeq) => {
    const res = await TokenAxios.get(`/api/category/${categorySeq}`)
    setSubCategoryList(res.data.result.data);
  }

  // 상위 옵션 API
  const getOptionList = async() => {
    const res = await TokenAxios.get(`/api/option`);
    setOptionList(res.data.result.data);
  }

  // 하위 옵션 API
  const getSubOptionList = async(optionCode) => {
    const res = await TokenAxios(`/api/option/${optionCode}`);
    setSubOptionList(res.data.result.data);
  }


  // 이미지 S3 통한 URL 반환
  const selectFile = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      try {
        //업로드할 파일의 이름으로 Date 사용
        const name = Date.now();
        //s3 관련 설정
        AWS.config.update({
          region: REACT_APP_AWS_S3_BUCKET_REGION,
          accessKeyId: REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID,
          secretAccessKey: REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY,
          
        });
        //s3에 업로드할 객체 생성
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: REACT_APP_AWS_S3_STORAGE_BUCKET_NAME, //버킷 이름
            Key: `upload/${name}.${file.type.split("/")[1]}`,
            Body: file,
            ContentType: file.type,
          },
        });
        //이미지 업로드 url 반환
        const IMG_URL = await upload.promise().then((res) => res.Location);
        console.log(IMG_URL);
        
        setProductImage(IMG_URL)  
              
      } catch (error) {
        console.error('Error during S3 upload:', error);

        // 오류 메시지 또는 에러 코드 출력
        if (error.message) {
          console.error('Error message:', error.message);
        }
        if (error.code) {
          console.error('Error code:', error.code);
        }
      }
    } else {
      //업로드 취소할 시
      
      return;
    }

    //화면에 프로필 사진 표시

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        //setForm({...form, profileImage : reader.result});
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // 옵션 스위치
  const [state, setState] = React.useState({
    option: false,
  });

  // 옵션 스위치 상태 변경함수
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  // 에디터 값 react-hook-form으로 전달하기 위한 함수
  const handleEditorContentChange = (info) => {
    setValue('info', info, { shouldValidate: true });
    trigger('info');
  };


  // 상품 등록 클릭시 API 요청
  const handleRegisterBtnClicked = async(data) => {
    data.prdtOptionList = [{amount : data.amount, prdtOptionSeq : data.prdtOptionSeq}];
    delete data.amount;
    delete data.prdtOptionSeq;
    data.imageUrl = productImage;
    
    try{
      const res = await TokenAxios.post(`/api/product`, data);
      if(res.data.success){
        Swal.fire({
          icon: "success",
          title: "🎉🎉상품이 등록되었습니다!",
          showConfirmButton: false,
          timer: 1000,
        });
      }else{
        Swal.fire("상품 등록하는데에 문제가 발생하였습니다", "", "info");
      }
    }catch(e){
      console.log(e);
      Swal.fire("상품 등록하는데에 문제가 발생하였습니다", "", "info");
    }
    
  }

  useEffect(() => {
    setSelectedMenu("상품 등록");
    getCategoryList();
    getOptionList();
  }, []);
  
  

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
        <form
          onSubmit={handleSubmit((data) => {
            handleRegisterBtnClicked(data);
          })}
        >
          <Grid container spacing={2}>
            <Grid item xs={3.5}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {productImage && <img
                  src={productImage}
                  alt="Preview"
                  style={{ minWidth: "500px", minHeight: "500px", maxWidth : "500px", maxHeight : "500px", marginBottom : "3vh" }}
                />}
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="photo-upload"
                  type="file"
                  onChange={selectFile}
                />
                <label htmlFor="photo-upload">
                  <AdminButton variant="contained" component="span">
                    첨부하기
                  </AdminButton>
                </label>
              </div>
            </Grid>
            <Grid item xs={1.5}>

            </Grid>
            <Grid item xs={7}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "40px",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ width: "10%", mr: 2 }}
                >
                  카테고리
                </Typography>
                <Select
                  onChange={(e) => {
                    getSubCategoryList(e.target.value);
                  }}
                  sx={{ mr: 6, width: "47%" }}
                >
                  {categoryList.map((category) => (
                    <MenuItem key={category.categorySeq} value={category.categorySeq}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  sx={{width : "47%" }}
                  {...register("categorySeq")}  
                >
                  {subCategoryList.map((subCategory) => (
                    <MenuItem 
                      key={subCategory.categorySeq} 
                      value={subCategory.categorySeq}
                      
                    >
                      {subCategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ width: "10%", mb: 4, mr: 2 }}
                >
                  이름
                </Typography>
                <InputBoxM
                  id="name"
                  color="neutral"
                  disabled={false}
                  placeholder="이름"
                  variant="soft"
                  sx={{ mb: 4 }}
                  {...register("name")}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ width: "10%", mb: 4, mr: 2 }}
                >
                  제조사
                </Typography>
                <InputBoxM
                  color="neutral"
                  disabled={false}
                  placeholder="제조사"
                  variant="soft"
                  sx={{ mb: 4 }}
                  {...register("company")}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ width: "10%", mb: 4, mr: 2 }}
                >
                  가격
                </Typography>
                <InputBoxM
                  color="neutral"
                  disabled={false}
                  placeholder="가격"
                  variant="soft"
                  sx={{ mb: 4 }}
                  {...register("price")}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "40px",
                  marginTop: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ width: "10%", mr: 2 }}
                >
                  옵션
                </Typography>

                <PinkSwitch
                  sx={{ mr: 2 }}
                  checked={state.option}
                  onChange={handleChange}
                  name="option"
                />

                {state.option && (
                  <>
                    <Select
                      onChange={(e) => {
                        getSubOptionList(e.target.value);
                      }}
                      sx={{ width : "30%", mr: 3, }}
                    >
                      {optionList.map((option) => (
                        <MenuItem key={option.optionCode} value={option.optionCode}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Select
                      sx={{ width : "30%", mr: 3, }}
                      {...register(`prdtOptionSeq`)}
                    >
                      {subOptionList.map((subOption) => (
                        <MenuItem key={subOption.prdtOptionSeq} value={subOption.prdtOptionSeq}>
                          {subOption.detail}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <Input 
                      type="number"
                    /> */}
                    <InputBoxXS
                      type="number"
                      color="neutral"
                      disabled={false}
                      placeholder="수량"
                      variant="soft"
                      {...register("amount")}
                    />
                  </>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "40px",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ width: "10%", mr: 2 }}
                >
                  판매여부
                </Typography>
                <FormControl>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        row
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <FormControlLabel
                          value="Y"
                          control={
                            <Radio
                              size="large"
                              sx={{
                                color: pink[800],
                                "&.Mui-checked": { color: pink[600] },
                              }}
                            />
                          }
                          label="판매중"
                        />
                        <FormControlLabel
                          value="N"
                          control={
                            <Radio
                              size="large"
                              sx={{
                                color: pink[800],
                                "&.Mui-checked": { color: pink[600] },
                              }}
                            />
                          }
                          label="판매중단"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ width: "10%", mb: 4, mr: 2 }}
                >
                  상세설명
                </Typography>
                <EditorComponent
                    onContentChange={handleEditorContentChange}
                    placeholder="상품 정보를 입력하세요"
                    id="info"
                    onChange={(event, editor) => {
                        setValue("info", editor.getData());
                        trigger("info");
                        console.log("info");
                    }}
                />
              </div>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", mt: 10 }}
          >
            <AdminButton 
              variant="contained" 
              type="submit"
            >
              등록
            </AdminButton>
          </Grid>
        </form>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductRegisterPage;
