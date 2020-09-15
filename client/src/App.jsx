import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";
import Login from "./components/Login";

import { Provider as AuthProvider } from "./state/auth";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <Root>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="*" component={Login} />
            </Switch>
          </Root>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    font-family: "Nunito Sans", sans-serif; 
  }
`;

const Root = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.background.main};
`;

export default App;
