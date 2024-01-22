import { Grid } from "@mui/material";
import Footer from "components/layout/footer/Footer";
import Header from "components/layout/header/Header";
import styled from "@emotion/styled";
import Sidebar from "components/Sidebar";

const SidebarLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={8}>
            {children}
          </Grid>
        </Grid>
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

export default SidebarLayout;
