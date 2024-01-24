import { Grid } from "@mui/material";
import Sidebar from "components/organisms/Sidebar";
import Footer from "components/organisms/footer/Footer";
import Header from "components/organisms/header/Header";
import styled from "styled-components";

const SidebarLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={9}>
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
