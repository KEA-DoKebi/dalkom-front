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
import { useNavigate, useParams } from "react-router-dom";

const ProductEditPage = () => {
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
  const [selectedMenu, setSelectedMenu] = useState("상품 수정/삭제");
  const [productImage, setProductImage] = useState(
    "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
  );
  const [productCategorySeq, setProductCategorySeq] = useState();
  const [productName, setProductName] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productStockList, setProductStockList] = useState();
  const [productInfo, setProductInfo] = useState();
  const [productState, setProductState] = useState();
  const { productSeq } = useParams(); // URL에서 seq 파라미터를 가져옴
  // useState로 "바꿀 수량"을 관리하는 상태 추가
  const [selectedAmount, setSelectedAmount] = useState("");

  // 옵션 선택 시 호출될 함수
  const handleOptionChange = (event) => {
    const selectedOptionSeq = event.target.value; // 선택된 옵션의 시퀀스 값

    // 선택된 옵션의 amount 찾기
    const selectedOption = productStockList.find(
      (option) => option.productOptionSeq === Number(selectedOptionSeq)
    );

    if (selectedOption) {
      setSelectedAmount(selectedOption.amount); // "바꿀 수량" 상태 업데이트
    }
  };

  // 상품 정보를 가져오는 함수
  const getProductDetails = async (productSeq) => {
    try {
      const response = await TokenAxios.get(`/api/product/${productSeq}`);
      const data = response.data.result.data;
      setProductCategorySeq(Number(data.categorySeq));
      setProductName(data.name); // 상품 정보를 상태에 저장
      setProductCompany(data.company);
      setProductPrice(data.price);
      setProductStockList(data.stockList);
      setProductImage(data.imageUrl);
      setProductInfo(data.info);
      setProductState(data.state);
      console.log(data);

      // 폼 필드에 상품 정보를 설정하는 로직 (예: setValue)
    } catch (error) {
      console.error("Fetching product details failed:", error);
      // 에러 처리 로직
    }
  };

  

  // 상품 정보 수정 API 요청 함수
  const editProductDetails = async (formData) => {
    // optionAmountList 조정
    const modifiedOptionAmountList = productStockList.map((option) => ({
      prdtOptionSeq: option.productOptionSeq, // 변경: productOptionSeq -> prdtOptionSeq
      amount: selectedAmount, // 사용자가 변경한 수량 반영
    }));

    const dataToSend = {
      ...formData,
      categorySeq: productCategorySeq,
      imageUrl: productImage,
      price: parseInt(productPrice), // 가격을 숫자로 변환
      info: productInfo,
      optionAmountList: modifiedOptionAmountList, // 수정된 옵션 리스트 사용
    };

    try {
      const res = await TokenAxios.put(
        `/api/product/${productSeq}`,
        dataToSend
      );
      if (res.data.success) {
        Swal.fire({
          //
          icon: "success",
          title: "상품이 등록되었습니다.",
          showConfirmButton: true,
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
    if (productSeq) {
      getProductDetails(productSeq); // 페이지 로딩 시 상품 정보를 가져옴
    }
  }, [productSeq]);

  useEffect(() => {
    if (productCategorySeq) {
      findParentAndSubCategory(productCategorySeq); // 페이지 로딩 시 상품 정보를 가져옴
    }
  }, );

  useEffect(() => {
    // productState 값이 설정되면 해당 상태에 맞는 라디오 버튼을 선택하도록 설정
    if (productState) {
      setValue("state", productState);
    }
  }, [productState, setValue]);

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

    // 에디터 변경 핸들러
    const handleEditorChange = (content) => {
      setValue("info", content);
      setProductInfo(content);
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

  const categoryMapping = {
    "패션/뷰티": {
      id: 1,
      subCategories: [
        { id: 7, name: "여성" },
        { id: 8, name: "남성" },
        { id: 9, name: "신발" },
        { id: 10, name: "기타" },
        { id: 11, name: "메이크업" },
        { id: 12, name: "향수" },
      ],
    },
    생활: {
      id: 2,
      subCategories: [
        { id: 13, name: "욕실" },
        { id: 14, name: "주방" },
        { id: 15, name: "반려동물" },
        { id: 16, name: "자동차용품" },
      ],
    },
    "디지털/가전": {
      id: 3,
      subCategories: [
        { id: 17, name: "영상가전" },
        { id: 18, name: "생활가전" },
        { id: 19, name: "건강가전" },
        { id: 20, name: "주방가전" },
      ],
    },
    "출산/유아동": {
      id: 4,
      subCategories: [
        { id: 21, name: "유아동의류" },
        { id: 22, name: "분유/기저귀" },
        { id: 23, name: "출산용품" },
        { id: 24, name: "완구, 교구" },
      ],
    },
    "스포츠/레저": {
      id: 5,
      subCategories: [
        { id: 25, name: "등산" },
        { id: 26, name: "캠핑" },
        { id: 27, name: "낚시" },
        { id: 28, name: "헬스" },
        { id: 29, name: "수영" },
        { id: 30, name: "골프" },
        { id: 31, name: "자전거" },
      ],
    },
    카카오굿즈: {
      id: 6,
      subCategories: [{ id: 32, name: "카카오굿즈" }],
    },
  };

  // 하위 카테고리 시퀀스로부터 상위 카테고리 및 하위 카테고리 정보를 찾는 함수
  const findParentAndSubCategory = (subCategorySeq) => {
    for (const [
      categoryName,
      { id: parentId, subCategories },
    ] of Object.entries(categoryMapping)) {
      const foundSubCategory = subCategories.find(
        (subCategory) => subCategory.id === subCategorySeq
      );
      if (foundSubCategory) {
        return {
          parentCategoryName: categoryName,
          parentId,
          subCategory: foundSubCategory,
        };
      }
    }
    return null; // 매핑 정보를 찾을 수 없는 경우
  };

  return (
    <Paper sx={{ display: "flex", minHeight: "100vh" }} elevation={0}>
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
          <form onSubmit={handleSubmit(editProductDetails)}>
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
                  {productCategorySeq && (
                    <Typography fontWeight="bold" sx={{ width: "auto", mr: 2 }}>
                      {
                        findParentAndSubCategory(productCategorySeq)
                          ?.parentCategoryName
                      }
                    </Typography>
                  )}
                  -
                  {productCategorySeq && (
                    <Typography fontWeight="bold" sx={{ width: "auto", ml: 2 }}>
                      {
                        findParentAndSubCategory(productCategorySeq)
                          ?.subCategory.name
                      }
                    </Typography>
                  )}
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
                    value={productName}
                    {...register("name")}
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                    variant="soft"
                    sx={{ mb: 4 }}
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
                    value={productCompany}
                    {...register("company")}
                    onChange={(e) => {
                      setProductCompany(e.target.value);
                    }}
                    variant="soft"
                    sx={{ mb: 4 }}
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
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    variant="soft"
                    sx={{ mb: 4 }}
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
                      <FormControl sx={{ mr: 3, width: "60%" }}>
                        <InputLabel id="category-select-label">옵션</InputLabel>
                        <Select
                          label="옵션"
                          sx={{ height: "50px" }}
                          onChange={handleOptionChange} // 옵션 변경 시 handleOptionChange 호출
                        >
                          {productStockList.map((productStock) => (
                            <MenuItem
                              key={productStock.productOptionSeq}
                              value={productStock.productOptionSeq}
                            >
                              {`${productStock.detail} : ${productStock.amount}개`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  )}
                  <InputBoxXS
                    type="number"
                    color="neutral"
                    disabled={false}
                    placeholder="바꿀 수량"
                    variant="soft"
                    value={selectedAmount} // "바꿀 수량" 입력 필드에 선택된 옵션의 amount 값 설정
                    onChange={(e) => setSelectedAmount(e.target.value)} // 사용자가 값을 변경할 경우를 대비하여 onChange 핸들러도 설정
                  />
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
                      defaultValue={productState === "N" ? "N" : "Y"} // 상품 판매 상태에 따라 기본값 설정
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          row
                          value={field.value} // Controller에서 관리하는 현재 값 사용
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
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
                  onContentChange={handleEditorChange}
                  id="info"
                  data=""
                  placeholder="상품 정보를 입력하세요"
                  value={productInfo}
                  onChange={(event, editor) => {
                    setValue("content", editor.getData());
                    trigger("content");
                    console.log("content");
                  }}
                  maxWidth={false}
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
                수정
              </AdminButton>
            </Grid>
          </form>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductEditPage;