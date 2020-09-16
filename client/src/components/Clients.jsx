import React from "react";
import styled from "styled-components";

import DashboardLayout from "../layouts/DashboardLayout";

import Button from "./Button";

function Clients({ history }) {
  return (
    <DashboardLayout>
      <Container>
        <Header>
          <h1>Clients</h1>
          <StyledButton
            color="primary"
            onClick={() => history.push("clients/new")}
          >
            Add New Client
          </StyledButton>
        </Header>
      </Container>
    </DashboardLayout>
  );
}

const Container = styled.div`
  height: 100%;
  padding: ${(props) => props.theme.spacing(10, 30)};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 40px;
  font-size: 0.9rem;
  font-weight: 600;
`;

export default Clients;
