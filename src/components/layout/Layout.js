import { Grid } from "@mui/material";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styled from "@emotion/styled";
import Sidebar from "../Sidebar";

const Layout = ({children}) => {
    return(
        <Layout1>
            <Header />
            <Main>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={4}>
                    <Sidebar />
                </Grid>
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={10}>
                    content
                </Grid>
                </Grid>
            </Main>
            <Footer />
        </Layout1>
    )
}

const Layout1 = styled.div`
    padding-top : 15vh;
`

const Main = styled.main`
    min-height: 67vh;
`


export default Layout;