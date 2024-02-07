// UserFaq.js (새로운 페이지)
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 70%;
  margin: 0 auto;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid;
  border-radius: 20px;
  border-color: #eeeeee;
  min-height: 50vh;
`;

const FAQDetailBody = () => {
  const location = useLocation();
  const { selectedFaq } = location.state;

  return (
    <Main>
      <h1>{selectedFaq.title}</h1>
      <Body dangerouslySetInnerHTML={{ __html: selectedFaq.content }}></Body>
    </Main>
  );
};

export default FAQDetailBody;
