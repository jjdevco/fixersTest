import React from "react";
import styled from "styled-components";

import SidebarButton from "./SidebarButton";

function Sidebar() {
  const buttons = [
    {
      icon: "fa-th",
      text: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: "fa-wrench",
      text: "Repairs",
      path: "/dashboard/repairs",
    },
    {
      icon: "fa-car",
      text: "Cars",
      path: "/dashboard/cars",
    },
    {
      icon: "fa-address-card",
      text: "Clients",
      path: "/dashboard/clients",
    },
  ];
  return (
    <Container>
      <Logo>
        <LogoLeft>Fixers</LogoLeft>
        &nbsp;
        <LogoRight>Web</LogoRight>
      </Logo>
      <Divider />
      <Buttons>
        {buttons.map(({ icon, text, path }) => (
          <SidebarButton key={path} icon={icon} text={text} path={path} />
        ))}
      </Buttons>
      <Divider />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 250px;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.background.lighten};
  box-shadow: ${(props) => props.theme.shadow(1)};
  z-index: 30;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52px;
  font-size: 1.2rem;
  cursor: default;
`;

const LogoLeft = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary.main};
`;

const LogoRight = styled.span`
  font-weight: 400;
  color: ${(props) => props.theme.colors.text.main};
`;

const Buttons = styled.div`
  padding: ${(props) => props.theme.spacing(10, 0)};
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.colors.background.darken};
`;
export default Sidebar;
