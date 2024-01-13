import React from "react";
import useStore from "./store/store";
import {
  BoxOne,
  BoxTwo,
  Wrapper,
  Box,
  CommonCircle,
  AnimationCircle,
  SpanBox,
} from "./common";
import { DefaultAxios } from "./apis/CommonAxios";

const Tutorial = () => {
  // zustand의 store 불러와서 사용.
  const { bears, increasePopulation, removeAllBears } = useStore(
    (state) => state,
  );

  // 공통 axios 사용 예제
  const testAxios = () => {
    // console.log(process.env.REACT_APP_SERVER_ADDRESS);
    const res = DefaultAxios.get("/redis");
    alert("가져온 데이터: " + res.data);
  }

  return (
    <>
      {/* style-component 사용 예제 */}
      <Wrapper>
        <Box backgroundcolor={"#cf6a87"} />
        <Box
          as="button"
          backgroundcolor={"#574b90"}
          onClick={() => alert("버튼이 클릭되었습니다.")}
        />{" "}
        {/* as 를 사용해서 div를 button 속성으로 바꿀수 있다. */}
        <CommonCircle backgroundcolor={"black"} />
        <AnimationCircle />
        <SpanBox backgroundcolor={"#cf6a87"}>
          <span>😄</span>
        </SpanBox>
      </Wrapper>

      {/* zustand 사용 예제 */}
      <h1>{bears} around here ...</h1>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>remove all</button>

      <button onClick={testAxios}>Axios Test</button>

    </>
  );
};

export default Tutorial;
