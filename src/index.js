import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import theme from "./styles/commonTheme";
import { StyledEngineProvider } from '@mui/styled-engine';
import GlobalStyle from "./styles/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
        <Router />
    </ThemeProvider>
  </StyledEngineProvider>
);



