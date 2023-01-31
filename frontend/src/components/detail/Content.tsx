import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface IProps {
  detailData: {
    auctionSeq: number;
    // imageList: FileList;
    userSeq: number;
    categorySeq: number;
    title: string;
    content: string;
    startTime: string;
    startPrice: number;
    likeCount: number;
    isReady: number;
  };
}

export default function Content({ detailData }: IProps) {
  return (
    <ContentBox>
      <div className="contentTitle">{detailData.title}</div>
      <div className="contentCataegory">{detailData.categorySeq}</div>
      <div className="contentDescription">{detailData.content}</div>
    </ContentBox>
  );
}

const ContentBox = styled.div`
  padding: 2.4rem;
  display: flex;
  height: 35%;
  flex-direction: column;
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
