import React from "react";
import styled from "styled-components";

import { useHistory, useLocation } from "react-router-dom";

function SidebarButton({ icon, text, path }) {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const active = path === pathname;

  return (
    <Container active={active} onClick={() => push(path)}>
      <Content active={active}>
        <Icon active={active} className={`fas ${icon}`} />
        <Text>{text}</Text>
      </Content>
    </Container>
  );
}

const Container = styled.button`
  position: relative;
  min-height: 42px;
  width: 100%;
  outline: none;
  border: 0;
  border-radius: 0;
  margin: ${(props) => props.theme.spacing(2, 0)};
  padding: ${(props) => props.theme.spacing(0, 20)};
  color: ${(props) =>
    props.active
      ? props.theme.colors.background.main
      : props.theme.colors.text.main};
  background: ${(props) => props.theme.colors.background.lighten};
  cursor: pointer;

  :hover {
    ::after {
      background: ${(props) => props.theme.colors.background.lighten}
      filter: brightness(85%);
    }
  };

  ::after {
    content: "";
    position: absolute;
    height: 42px;
    width: 5px;
    top: 0;
    left: 0;
    border-radius: 0 4px 4px 0; 
    background: ${(props) =>
      props.active
        ? props.theme.colors.primary.main
        : props.theme.colors.background.lighten};

  transition: all 125ms ease-in-out;

`;

const Content = styled.div`
  min-height: 42px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing(0, 10)};
  background: ${(props) =>
    props.active
      ? props.theme.colors.primary.main
      : props.theme.colors.background.lighten};
  ${Container}:hover & {
    filter: brightness(85%);
  }
  transition: all 125ms ease-in-out;
`;

const Icon = styled.i`
  height: 18px;
  width: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.spacing(8)};
  border: 2px solid
    ${(props) =>
      props.active
        ? props.theme.colors.background.main
        : props.theme.colors.text.main};
  border-radius: 4px;
`;

const Text = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
`;

export default SidebarButton;
