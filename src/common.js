import styled, { keyframes } from "styled-components";
import theme from "./styles/commonTheme";
import { Button } from "@mui/material";
import { Input, Link } from "@mui/joy";

// ※ 아래는 mui + styled-components 어떻게 사용할지에 대한 예제이고 나중에 삭제해도 됩니다.

export const CustomButton = styled(Button)`
  background-color: black;
  color : white;
  &:hover {
    background-color: gray;
  }
`;

export const CustomLink = styled(Link)`
  background-color : black;
  color : white;
`

export const Dwa = styled(Button)`
  background-color: orange;
`;

export const StyledDateInput = styled(Input)`
  width: 100%;

  &::before {
    content: attr(data-placeholder);
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  &:focus::before,
  &:valid::before {
    display: none;
  }
`;

