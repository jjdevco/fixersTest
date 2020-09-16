import React from "react";
import styled from "styled-components";

import DashboardLayout from "../layouts/DashboardLayout";

import Button from "./Button";

function Cars({ history }) {
  return (
    <DashboardLayout>
      <Container>
        <Header>
          <h1>Cars</h1>
          <StyledButton
            color="primary"
            onClick={() => history.push("/dashboard/cars/new")}
          >
            Add New Car
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

export default Cars;
