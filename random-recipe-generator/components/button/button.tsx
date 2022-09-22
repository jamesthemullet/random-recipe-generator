import styled from "@emotion/styled";

const StyledButton = styled.button`
  padding: 10px 20px;
  background: white;
  outline: none;
  border: 2px solid black;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: lightblue;
  }

  &:active {
    background: blueviolet;
    color: white;
  }
`;

const Button = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
