
import Footer from "components/organisms/footer/Footer";
import Header from "components/organisms/header/Header";
import styled from "styled-components";

const DefaultLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        {/* 여기에 props 데이터를 넣으세요 */}
        {children}
      </Main>
      <Footer />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  padding-top: 15vh;
`;

const Main = styled.main`
  min-height: 67vh;
`;

export default DefaultLayout;
