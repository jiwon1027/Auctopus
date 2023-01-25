import React from "react";
import styled from "styled-components";

export default function Title() {
  return (
    <StyledTitle>
      <h2>
        관심 카테고리를 설정해주시면
        <br /> 해당 카테고리 우선으로 경매가 노출 됩니다.
      </h2>
      <h1>관심 카테고리 설정</h1>
    </StyledTitle>
  );
}

const StyledTitle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 3.5rem;
    color: ${(props) => props.theme.colors.primary};
    margin-top: 0;
  }
  h2 {
    font-size: 1.7rem;
    color: #6a994e;
    font-weight: normal;
  }
`;
