import React from "react";
import styled from "styled-components";

export default function Title() {
  return (
    <StyledTitle>
      <h1>회원가입</h1>
    </StyledTitle>
  );
}

const StyledTitle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  h1 {
    font-size: 3.5rem;
    color: ${(props) => props.theme.colors.primary};
    margin: auto;
  }
`;
