import styled from "styled-components";

const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing(10, 30)};
`;

export default Container;
