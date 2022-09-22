import styled from "@emotion/styled";

const StyledButton = styled.button`
  padding: 10px 20px;
  background: #81b29a;
  outline: none;
  border: 2px solid black;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Raleway';

  &:hover {
    background: #e07a5f;
  }

  &:active {
    background: #e07a5f;
    color: white;
  }
`;

const Button = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
