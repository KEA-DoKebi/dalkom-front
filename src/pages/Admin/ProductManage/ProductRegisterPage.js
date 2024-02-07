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
  InputLabel,
  IconButton,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { InputBoxXS, InputBoxM } from "components/atoms/Input";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AdminButton } from "components/atoms/AdminCommonButton";
import { PinkSwitch } from "components/atoms/OnOffSwitch";
import { useForm, Controller } from "react-hook-form";
import { TokenAxios } from "apis/CommonAxios";
import AWS from "aws-sdk";
import EditorComponent from "components/atoms/Editor";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ProductRegisterPage = () => {
  const navigate = useNavigate();

  // env 파일 변수로 설정
  const REACT_APP_AWS_S3_BUCKET_REGION =
    process.env.REACT_APP_AWS_S3_BUCKET_REGION;
  const REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID =
    process.env.REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID;
  const REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY =
    process.env.REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY;
  const REACT_APP_AWS_S3_STORAGE_BUCKET_NAME =
    process.env.REACT_APP_AWS_S3_STORAGE_BUCKET_NAME;

  // react-hook-form에 필요한 메소드들
  const { control, register, handleSubmit, setValue, trigger } = useForm();

  // useState들 선언
  const [selectedMenu, setSelectedMenu] = useState("상품 등록");
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [subOptionList, setSubOptionList] = useState([]);
  const [productImage, setProductImage] = useState(
    "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
  );

  // 상위 카테고리 API
  const getCategoryList = async () => {
    const res = await TokenAxios.get(`/api/category`);
    console.log(res.data);
    setCategoryList(res.data.result.data);
  };

  // 하위 카테고리 API
  const getSubCategoryList = async (categorySeq) => {
    const res = await TokenAxios.get(`/api/category/${categorySeq}`);
    setSubCategoryList(res.data.result.data);
  };

  // 옵션 및 수량 필드 상태 관리
  const [optionFields, setOptionFields] = useState([
    { prdtOptionSeq: "", amount: "" },
  ]);

  // 옵션 추가 함수
  const addOptionField = () => {
    setOptionFields([...optionFields, { prdtOptionSeq: "", amount: 1 }]);
  };

  // 옵션 제거 함수
  const removeOptionField = (index) => {
    const updatedOptionFields = optionFields.filter((_, idx) => idx !== index);
    setOptionFields(updatedOptionFields);
  };

  // 옵션 필드 값 변경 함수
  const handleOptionFieldChange = (index, field, value) => {
    const updatedOptionFields = optionFields.map((optionField, idx) =>
      idx === index ? { ...optionField, [field]: value } : optionField
    );
    setOptionFields(updatedOptionFields);
  };

  // 상위 옵션 API
  const getOptionList = async () => {
    const res = await TokenAxios.get(`/api/option`);
    setOptionList(res.data.result.data);
  };

  // 하위 옵션 API
  const getSubOptionList = async (optionCode) => {
    const res = await TokenAxios(`/api/option/${optionCode}`);
    setSubOptionList(res.data.result.data);
  };

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

        setProductImage(IMG_URL);
      } catch (error) {
        console.error("Error during S3 upload:", error);

        // 오류 메시지 또는 에러 코드 출력
        if (error.message) {
          console.error("Error message:", error.message);
        }
        if (error.code) {
          console.error("Error code:", error.code);
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
    setValue("info", info, { shouldValidate: true });
    trigger("info");
  };

  const handleRegisterBtnClicked = async (data) => {
    data.prdtOptionList = [
      { amount: Number(data.amount), prdtOptionSeq: data.prdtOptionSeq },
    ];

    delete data.amount;
    delete data.prdtOptionSeq;

    // 옵션 데이터를 prdtOptionList에 올바르게 포함시키기
    const optionListToAdd = optionFields
      .map((field) => ({
        prdtOptionSeq: Number(field.prdtOptionSeq), // 옵션 ID
        amount: Number(field.amount), // 수량을 숫자로 변환
      }))
      .filter((field) => field.prdtOptionSeq && field.amount); // 유효한 옵션만 필터링

    // 옵션 비활성화 상태에서 기본 옵션 값을 추가하는 로직
    if (!state.option && optionListToAdd.length === 0) {
      optionListToAdd.push({ prdtOptionSeq: 15, amount: 1 }); // 기본 옵션값 예시
    }

    // 기존 prdtOptionList가 있다면, 스프레드 연산자를 사용하여 기존 항목과 새로운 옵션 리스트를 합칩니다.
    data.prdtOptionList = [
      ...(data.prdtOptionList || []), // data.prdtOptionList가 존재하면 그 내용을 사용, 없으면 빈 배열 사용
      ...optionListToAdd, // 새로 추가되는 옵션 리스트
    ];

    // 최종 데이터 객체 준비
    const finalData = {
      ...data, // 기존 폼 데이터
      imageUrl: productImage, // 이미지 URL
      // 필요한 경우 기타 필드 추가
    };

    console.log(data);
    try {
      const res = await TokenAxios.post(`/api/product`, finalData);
      if (res.data.success) {
        // 성공 처리
        Swal.fire({
          icon: "success",
          title: "상품이 등록되었습니다.",
          confirmButtonColor: "black",
          confirmButtonText: "확인",
        }).then(() => {
          navigate("/admin/product/list");
        });
      } else {
        Swal.fire({
          //
          icon: "error",
          title: "상품 등록에 실패했습니다.",
          showConfirmButton: true,
          confirmButtonColor: "gray",
          confirmButtonText: "확인",
        });
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        //
        icon: "error",
        title: "상품 등록에 실패했습니다.",
        showConfirmButton: true,
        confirmButtonColor: "gray",
        confirmButtonText: "확인",
      });
    }
  };

  useEffect(() => {
    setSelectedMenu("상품 등록");
    getCategoryList();
    getOptionList();
  }, []);

  return (
    <Paper sx={{ display: "flex", minHeight:"100vh" }} elevation={0}>
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
            padding: 4,
          }}
        >
          <form
            onSubmit={handleSubmit((data) => {
              handleRegisterBtnClicked(data);
            })}
          >
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {productImage && (
                    <img
                      src={productImage}
                      alt="Preview"
                      style={{
                        minWidth: "500px",
                        minHeight: "500px",
                        maxWidth: "500px",
                        maxHeight: "500px",
                        marginBottom: "3vh",
                      }}
                    />
                  )}
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
              <Grid item xs={1.5}></Grid>
              <Grid item xs={7.5}>
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
                  <FormControl sx={{ mr: 5, width: "42%" }}>
                    <InputLabel id="category-select-label">
                      상위 카테고리
                    </InputLabel>
                    <Select
                      sx={{ height: "50px" }}
                      label="상위 카테고리"
                      onChange={(e) => {
                        getSubCategoryList(e.target.value);
                      }}
                    >
                      {categoryList.map((category) => (
                        <MenuItem
                          key={category.categorySeq}
                          value={category.categorySeq}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "42%" }}>
                    <InputLabel id="category-select-label">
                      하위 카테고리
                    </InputLabel>
                    <Select
                      label="하위 카테고리"
                      sx={{ height: "50px" }}
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
                  </FormControl>
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
                      <FormControl sx={{ width: "25%", mr: 3 }}>
                        <InputLabel id="category-select-label">
                          옵션 타입
                        </InputLabel>

                        <Select
                          label="옵션 타입"
                          sx={{ height: "50px" }}
                          onChange={(e) => {
                            getSubOptionList(e.target.value);
                          }}
                        >
                          {optionList.map((option) => (
                            <MenuItem
                              key={option.optionCode}
                              value={option.optionCode}
                            >
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ width: "25%", mr: 3 }}>
                        <InputLabel id="category-select-label">옵션</InputLabel>

                        <Select
                          sx={{ height: "50px" }}
                          label="옵션"
                          {...register(`prdtOptionSeq`)}
                        >
                          {subOptionList.map((subOption) => (
                            <MenuItem
                              key={subOption.prdtOptionSeq}
                              value={subOption.prdtOptionSeq}
                            >
                              {subOption.detail}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* <Input 
                      type="number"
                    /> */}
                    </>
                  )}
                  <InputBoxXS
                    type="number"
                    color="neutral"
                    disabled={false}
                    placeholder="수량"
                    variant="soft"
                    sx={{ mr: 2 }}
                    {...register("amount")}
                  />
                  {state.option && (
                    <>
                      <IconButton onClick={addOptionField} variant="contained">
                        <AddCircleIcon
                          sx={{ fontSize: "30px", color: pink[600] }}
                        />
                      </IconButton>
                    </>
                  )}
                </div>
                {state.option && addOptionField && (
                  <div >
                    {optionFields.map((field, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent:"flex-end",
                          marginBottom: "40px",
                          marginTop:"-30px",
                          marginRight:"4.5px"
                        }}
                      >
                        <FormControl sx={{ width: "25%", mr: 3 }}>
                          <InputLabel id={`option-label-${index}`}>
                            옵션
                          </InputLabel>
                          <Select
                            label="옵션"
                            value={field.prdtOptionSeq}
                            onChange={(e) =>
                              handleOptionFieldChange(
                                index,
                                "prdtOptionSeq",
                                e.target.value
                              )
                            }
                            sx={{ height: "50px" }}
                          >
                            {subOptionList.map((subOption) => (
                              <MenuItem
                                key={subOption.prdtOptionSeq}
                                value={subOption.prdtOptionSeq}
                              >
                                {subOption.detail}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <InputBoxXS
                          type="number"
                          color="neutral"
                          placeholder="수량"
                          variant="soft"
                          sx={{ mr: 2 }}
                          value={field.amount}
                          onChange={(e) =>
                            handleOptionFieldChange(
                              index,
                              "amount",
                              e.target.value
                            )
                          }
                        />
                        <IconButton onClick={() => removeOptionField(index)}>
                          <RemoveCircleIcon
                            sx={{ fontSize: "30px", color: pink[600] }}
                          />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                )}

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
              <AdminButton variant="contained" type="submit">
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
