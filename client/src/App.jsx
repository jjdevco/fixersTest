import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Notifier from "./components/Notifier";

import { Provider as AuthProvider } from "./state/auth";
import WithAuthentication from "./middlewares/withAuthentication";

import { SnackbarProvider } from "notistack";
import { Provider as NotificationsProvider } from "./state/notifications";

function App() {
  return (
    <Router>
      <NotificationsProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            preventDuplicate
            classes={{
              variantSuccess: theme.colors.success.main,
              variantError: theme.colors.danger.main,
              variantWarning: theme.colors.warning.main,
              variantInfo: theme.colors.info.main,
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <GlobalStyle />
            <Notifier />
            <AuthProvider>
              <Root>
                <Switch>
                  <Route path="/login" component={WithAuthentication(Login)} />
                  <Route
                    path="/dashboard"
                    component={WithAuthentication(Dashboard)}
                  />
                  <Route path="*" component={WithAuthentication(Dashboard)} />
                </Switch>
              </Root>
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </NotificationsProvider>
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
