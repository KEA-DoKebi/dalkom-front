import DefaultLayout from "../../components/layout/DefaultLayout";
import styled from "styled-components";
import { Link } from "react-router-dom/dist";
import Button from "@mui/material/Button";



const Notice = () => {
  
  return (
    <DefaultLayout>
        <Top>
          <TextL>고객센터</TextL>
          <Choice>
            <StyledButton>
              <Link to="/manual">이용안내</Link> 
            </StyledButton>
            <StyledButton>
              <Link to="/notice">공지사항</Link>
            </StyledButton>
            <StyledButton>
              FAQ
            </StyledButton>
          </Choice>
        </Top>
        <Body>
          공지사항 내용
        </Body>
      </DefaultLayout>
  )
}

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 9%;
  margin-right: 9%;
  align-items: center;
  margin-top: -8vh;
  margin-bottom: 30px;

`;

const TextL = styled.h1`
  font-size: 30px;
`;

const Choice = styled.div`
  display: flex;
  gap: 5px;
  background-color: #f8fafc;
  border-radius: 50px;
  border: 1px solid;
  padding: 0 20px;
`;

const StyledButton = styled(Button)`
  color: #000000;
  font-size: 20px;
  margin-left: 5px;
  margin-eight: 5px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export default Notice;