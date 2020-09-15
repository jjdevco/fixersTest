import styled from "styled-components";

const Row = styled.div`
  width: inherit;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: ${(props) => props.theme.spacing(0, 0, 25, 0)};
`;

export default Row;
