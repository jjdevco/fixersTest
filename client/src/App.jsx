import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Login from "./components/Login";
function App() {
  return (
    <Router>
      <Root>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="*" component={Login} />
        </Switch>
      </Root>
    </Router>
  );
}

const Root = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export default App;
