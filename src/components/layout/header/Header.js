import React from "react";
import Topbar from "components/Topbar";
import styled from "@emotion/styled";
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
  z-index: 1;
`;

export default Header;
