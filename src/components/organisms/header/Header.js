import React from "react";
import styled from "styled-components";
import Topbar from "../Topbar";

const Header = () => {
  return (
    <Head>
      <Topbar />
    </Head>
  );
};

const Head = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  width: 100vw;
  height: 12vh;
  z-index: 100;
`;

export default Header;
