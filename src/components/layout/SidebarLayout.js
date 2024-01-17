import { Grid } from "@mui/material";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styled from "@emotion/styled";
import Sidebar from "../Sidebar";

const SidebarLayout = ({ children }) => {
  return (
    <Layout1>
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
    </Layout1>
  );
};

const Layout1 = styled.div`
  padding-top: 15vh;
`;

const Main = styled.main`
  min-height: 67vh;
`;

export default SidebarLayout;
