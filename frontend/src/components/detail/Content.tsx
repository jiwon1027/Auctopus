import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface IProps {
  auctionInfo: IAuctionDetail;
}

export default function Content({ auctionInfo }: IProps) {
  return (
    <ContentBox>
      <div className="contentTitle">{auctionInfo.title}</div>
      <div className="contentCataegory">
        {categories[auctionInfo.categorySeq - 1]?.name}
      </div>
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

const categories = [
  {
    categorySeq: 1,
    name: "전자기기",
  },
  {
    categorySeq: 2,
    name: "패션/잡화",
  },
  {
    categorySeq: 3,
    name: "도서/음반",
  },
  {
    categorySeq: 4,
    name: "완구/문구",
  },
  {
    categorySeq: 5,
    name: "뷰티/미용",
  },
  {
    categorySeq: 6,
    name: "인테리어",
  },
  {
    categorySeq: 7,
    name: "생활용품",
  },
  {
    categorySeq: 8,
    name: "기타",
  },
];
