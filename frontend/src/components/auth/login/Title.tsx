import React from "react";
import { ReactComponent as Turtle } from "@/assets/badges/turtle.svg";
import styled from "styled-components";

export default function Title() {
  return (
    <StyledTitle>
      <h1 className="title">Auctopus</h1>
      <div className="imgContainer">
        <Turtle className="signatureIcon" />
      </div>
    </StyledTitle>
  );
}

const StyledTitle = styled.section`
  flex: 1;

  .title {
    text-align: center;
    font-size: 5rem;
    color: ${(props) => props.theme.colors.primary};
  }

  .imgContainer {
    height: 100px;

    .signatureIcon {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
    }
  }
`;
