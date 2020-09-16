import styled from "styled-components";

const Title = styled.h1`
  width: 100%;
  margin: ${(props) => props.theme.spacing(10, 0)};
  font-size: 1.7rem;
  text-transform: capitalize;
`;

export default Title;
