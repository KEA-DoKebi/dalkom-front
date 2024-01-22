import React from "react";
import DefaultLayout from "components/layout/DefaultLayout";
import MainBody from "components/layout/body/MainPage/MainBody";

const MainPage = () => {
  // const testAxios = async() => {
  //   const res = await DefaultAxios.get("api/product/13");
  //   console.log(res.data)
  // }

  // useEffect(() => {
  //   testAxios();
  // })

  return (
    <DefaultLayout>
      <MainBody />
    </DefaultLayout>
  );
};

export default MainPage;
