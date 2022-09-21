import styled from "@emotion/styled";

const TestParagraph = styled.p`
  color: red;
`;

const TestButton = styled.button`
  color: hotpink;
`;

export const Test = () => {
  return (
    <>
      <TestParagraph>hello this is a test component</TestParagraph>
      <TestButton>this is a test button</TestButton>
    </>
  );
};

export default Test;
