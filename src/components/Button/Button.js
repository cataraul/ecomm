import styled from "styled-components";

const ButtonComponent = styled.button`
  height: 3rem;
  width: 10rem;
  border: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #fefefe;
  color: black;
  border: 1px solid black;
  &:hover {
    border: 1px solid #fefefe;
    background-color: #030303;
    color: #fefefe;
  }
`;
export default ButtonComponent;
