import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 모달 스타일
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 20%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
`;

const ModalText = styled.p`
  font-size: 40px;
  margin: 0;
`;

const Modal = ({ onClose }) => {
  // 모달이 열려있는 동안에는 화면을 가리기 위한 배경 레이어
  const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  `;

  return (
    <>
      <ModalOverlay />
      <ModalContainer>
        <ModalText>환영합니다</ModalText>
      </ModalContainer>
    </>
  );
};

const StyledButton = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1500);
    setTimeout(() => {
      // useNavigate를 사용하여 프로그래밍적으로 페이지 이동
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <button onClick={handleButtonClick}>저장하기</button>
      {isModalOpen && <Modal />}
    </>
  );
};

export default StyledButton;
