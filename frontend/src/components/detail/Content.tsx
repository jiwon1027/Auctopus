import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface IProps {
  auctionInfo: IAuctionInfo;
}

export default function Content({ auctionInfo }: IProps) {
  return (
    <ContentBox>
      <div className="contentTitle">{auctionInfo.title}</div>
      <div className="contentCataegory">{auctionInfo.categorySeq}</div>
      <div className="contentDescription">{auctionInfo.content}</div>
    </ContentBox>
  );
}

const ContentBox = styled.div`
  padding: 2.4rem;
  display: flex;
  height: 35%;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
  .contentTitle {
    font-size: 2.2rem;
    font-weight: ${theme.fontWeight.bold};
  }
  .contentCataegory {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: ${theme.colors.greyStandard};
  }
  .contentDescription {
    margin-top: 1.7rem;
    font-size: 1.5rem;
  }
`;
