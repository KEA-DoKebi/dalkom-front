import React from "react";
import useStore from "./store/store";
import {
  Wrapper,
  Box,
  CommonCircle,
  AnimationCircle,
  SpanBox,
} from "./common";
import { TokenAxios } from "./apis/CommonAxios";

const Tutorial = () => {
  // zustand의 store 불러와서 사용.
  const { bears, increasePopulation, removeAllBears } = useStore(
    (state) => state,
  );

  // 공통 axios 사용 예제
  // accessToken으로 refreshToken 가져오는 함수
  const testAxios = async() => {
    const result = await TokenAxios.get("/redis")
    console.log(result.data);
  }

  return (
    <>
      {/* style-component 사용 예제 */}
      <Wrapper>
        <Box backgroundcolor={"#cf6a87"} />
        {/* as 를 사용해서 div를 button 속성으로 바꿀수 있다. */}
        <Box
          as="button"
          backgroundcolor={"#574b90"}
          onClick={() => alert("버튼이 클릭되었습니다.")}
        />
        
        <CommonCircle backgroundcolor={"black"} />

        {/* Animation 적용 */}
        <AnimationCircle />
        <SpanBox backgroundcolor={"#cf6a87"}>
          <span>😄</span>
        </SpanBox>
      </Wrapper>

      {/* zustand 사용 예제 */}
      <h1>{bears} around here ...</h1>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>remove all</button>

      {/* axios 사용 예제 */}
      <button onClick={testAxios}>Axios Test</button>

    </>
  );
};

export default Tutorial;
