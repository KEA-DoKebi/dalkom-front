import React from "react";
import { CustomButton } from "../../common";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../components/layout/DefaultLayout";

const MainPage = () => {
  const navigate = useNavigate();
  // const testAxios = async() => {
  //   const res = await DefaultAxios.get("api/product/13");
  //   console.log(res.data)
  // }

  // useEffect(() => {
  //   testAxios();
  // })

  const handleBtnClick = (path) => {
    navigate(`${path}`);
  };

  return (
    <DefaultLayout>
      <CustomButton onClick={() => handleBtnClick("/category/1")}>
        상품목록
      </CustomButton>
      <CustomButton onClick={() => handleBtnClick("/product/1")}>
        상품상세
      </CustomButton>
      <CustomButton onClick={() => handleBtnClick("/cart/1")}>
        장바구니
      </CustomButton>
      <CustomButton onClick={() => handleBtnClick("/mypage/1")}>
        마이페이지
      </CustomButton>
      <CustomButton onClick={() => handleBtnClick("/notice")}>
        문의페이지
      </CustomButton>
      <CustomButton onClick={() => handleBtnClick("/admin")}>
        관리자페이지
      </CustomButton>
    </DefaultLayout>
  );
};

export default MainPage;
