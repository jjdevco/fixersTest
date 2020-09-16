import styled from "styled-components";

const Form = styled.form`
  height: auto;
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: ${(props) => props.theme.spacing(30)};
`;

export default Form;
