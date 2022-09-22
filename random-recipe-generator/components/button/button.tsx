import styled from "@emotion/styled";
import type { MouseEventHandler } from "react";

type ButtonProps = {
  text: string;
  onClick: MouseEventHandler | undefined;
};

const StyledButton = styled.button`
  padding: 10px 20px;
  background: #81b29a;
  outline: none;
  border: 2px solid black;
  font-size: 18px;
  cursor: pointer;
  font-family: "Raleway";
  border-radius: 5%;

  &:hover {
    background: #e07a5f;
  }

  &:active {
    background: #e07a5f;
    color: white;
  }
`;

const Button = ({ text, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
