import styled, { keyframes } from "styled-components";
import { Button } from "@mui/material";

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

// props 설정으로 배경색 변경하기 (위의 두개 박스 공통화)
export const Box = styled.div`
  background-color: ${(props) => props.backgroundcolor};
  width: 100px;
  height: 100px;
`;

// border-radius 빼면 위의 Box랑 다를게 없다. 이것을 공통화하면 아래와 같다.
export const Circle = styled.div`
  background-color: ${(props) => props.backgroundcolor};
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

//  /Users/kimjuhye/Documents/GitHub/dalkom-front/src/common.js

// styled(Box)를 써주면 기본 html 태그 말고도 mui나 커스터마이징한 컴포넌트도 넣을 수 있다.
export const CommonCircle = styled(Box)`
  border-radius: 50%;
`;

// required 속성을 가진 input 태그를 만들어준다.
export const Input = styled.input.attrs({ required: true })`
  background-color: orange;
  margin-right: 5px;
`;

// 여러 속성도 줄 수 있다.
export const SecondInput = styled.input.attrs({
  required: true,
  maxLength: 10,
})`
  background-color: orange;
  margin-right: 5px;
`;

// 애니메이션 효과를 지정하고
const CircleAnimation = keyframes`
  0% {
    background-color:red;
  }
  33% {
    background-color:green;
  }
  66%
  {
    background-color:blue;
  }
  100% {
    background-color:red;
  }
`;

// 위에 작성했던 CommonCircle에 애니메이션 효과를 적용한다.
// 이 때! 주의할 점은 애니메이션을 컴포넌트보다 먼저 정의해줘야한다.
export const AnimationCircle = styled(CommonCircle)`
  animation: ${CircleAnimation} 3s linear infinite;
`;

// &:hover를 사용하여 hover 효과를 줄 수 있다.
export const SpanBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    background-color: black;

    &:hover {
      background-color: white;
    }
  }
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
