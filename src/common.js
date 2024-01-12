import styled from "styled-components";
import { Button } from "@material-ui/core";

// ※ 아래는 mui + styled-components 어떻게 사용할지에 대한 예제이고 나중에 삭제해도 됩니다.

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15vh;
`;

export const BoxOne = styled.div`
  background-color: #cf6a87;
  width: 100px;
  height: 100px;
`;

export const BoxTwo = styled.div`
  background-color: #574b90;
  width: 100px;
  height: 100px;
`;

export const Box = styled.div`
  background-color: ${(props) => props.backgroundcolor};
  width: 100px;
  height: 100px;
`;

export const CommonButton = styled(Button)`
  background-color: black;
  color: white;
  width: 122px;
  height: 40px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  border-radius: 10px;
  transition: all 0.4s ease;

  &:hover {
    color: black;
    background: white;
    border: 2px solid black;
  }
`;

export const CommonColorButton = styled(Button)`
  background: rgba(0, 190, 254);
  color: white;
  width: 156px;
  height: 48px;
  border: 1px solid #dadada;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 48px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-right: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.05);
    background: rgba(0, 170, 234);
    transition: 0.5s;
  }
`;

export const CommonDeleteButton = styled(Button)`
  background: rgba(236, 83, 83);
  color: white;
  width: 156px;
  height: 48px;
  border: 1px solid #dadada;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 48px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-right: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.05);
    background: rgba(216, 63, 63);
    transition: 0.5s;
  }
`;
