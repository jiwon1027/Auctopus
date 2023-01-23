import React from "react";
import { ReactComponent as Turtle } from "@/assets/badges/turtle.svg";
import styled from "styled-components";

export default function Title() {
  return (
    <StyledTitle>
      <h1>Auctopus</h1>
      <div>
        <Turtle className="signatureIcon" />
      </div>
    </StyledTitle>
  );
}

const StyledTitle = styled.div`
  flex: 1;

  h1 {
    text-align: center;
    font-size: 5rem;
    color: ${(props) => props.theme.colors.primary};
  }

  div {
    height: 100px;

    .signatureIcon {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
    }
  }
`;
