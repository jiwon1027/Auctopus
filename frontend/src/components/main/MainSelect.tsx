import React from "react";
import styled from "styled-components";

export default function MainSelect() {
  return (
    <>
      <SelectBox>
        <div className="selectBoxL">진행중</div>
        <div className="selectBoxR">진행 예정</div>
      </SelectBox>
    </>
  );
}

const SelectBox = styled.div`
  width: 100%;
  font-size: 15px;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  cursor: pointer;

  .selectBoxL {
  }
`;
