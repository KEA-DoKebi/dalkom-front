import React from "react";
import useStore from "./store/store";
import { BoxOne, BoxTwo, Wrapper, Box } from "./common";

const App = () => {
  const { bears, increasePopulation, removeAllBears } = useStore(
    (state) => state,
  );

  return (
    <>
      <Wrapper>
        <Box backgroundcolor={"#cf6a87"} />
        <Box backgroundcolor={"#574b90"} />
        {/* <BoxOne/>
        <BoxTwo/> */}
      </Wrapper>
      <h1>{bears} around here ...</h1>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>remove all</button>
    </>
  );
};

export default App;
