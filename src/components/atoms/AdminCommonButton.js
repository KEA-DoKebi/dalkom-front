import styled from "styled-components";
import { Button } from "@mui/material";

//공통 버튼
export const AdminButton = styled(Button)`
    background-color: #fce8ef;
    color: #ec407a;
    width: 100px;
    height: 46px;
    font-size: 15px;
  text-align: center;
  font-weight: 500;
  line-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  margin-right: 50px;

  &:hover {
    background-color: #fce8ef;
    color: #ec407a;
  }

  &:active {
    color: #ffffff;
    background-color: #e42a5d;
  }
`;

//공통 버튼2
export const AdminButton2 = styled(Button)`
  background-color: white;
    border: 1px solid #e42a5d;
    
  color: #e42a5d;
  width: 60px;
  height: 40px;
  font-weight: 500;
  border-radius: 7px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    color: #ec407a;
      background-color: white;
  }

  &:active {
    color: #ffffff;
    background-color: #ffb1c2;
      border: 0px
  }
`;
