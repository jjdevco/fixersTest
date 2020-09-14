import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Root>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="*" component={Login} />
          </Switch>
        </Root>
      </ThemeProvider>
    </Router>
  );
}

const Root = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.background.main};
`;

export default App;
