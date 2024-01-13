import React from "react";
import useStore from "./store/store";
import { BoxOne, BoxTwo, Wrapper, Box, CommonCircle, AnimationCircle, SpanBox } from "./common";

const App = () => {
  const { bears, increasePopulation, removeAllBears } = useStore(
    (state) => state,
  );

  return (
    <>
      <Wrapper>
        <Box backgroundcolor={"#cf6a87"} />
        <Box as="button" backgroundcolor={"#574b90"} onClick={() => alert("버튼이 클릭되었습니다.")}/> {/* as 를 사용해서 div를 button 속성으로 바꿀수 있다. */}
        <CommonCircle backgroundcolor={"black"} />
        <AnimationCircle />
        <SpanBox backgroundcolor={"#cf6a87"}>
          <span>😄</span>
        </SpanBox>
      </Wrapper>
        
      
      <h1>{bears} around here ...</h1>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>remove all</button>
    </>
  );
};

export default App;
