import React from "react";

import styled from "styled-components";

function App() {
  return (
    <Root>
      <Title>Hello World!</Title>
    </Root>
  );
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Root = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: papayawhip;
`;

export default App;
