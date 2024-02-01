import React from "react";
import DefaultLayout from "components/templete/DefaultLayout";
import MainBody from "./MainBody";

console.log(process.env.REACT_APP_NODE_ENV);

const MainPage = () => {
  // const testAxios = async() => {
  //   const res = await DefaultAxios.get("api/product/13");
  //   console.log(res.data)
  // }

  // useEffect(() => {
  //   testAxios();
  // })

  // console.log(process.env);

  return (
    <DefaultLayout>
      <MainBody />
    </DefaultLayout>
  );
};

export default MainPage;
