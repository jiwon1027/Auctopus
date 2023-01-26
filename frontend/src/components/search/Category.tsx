import React from "react";
import { theme } from "@/styles/theme";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";

interface IDummy {
  title: string;
  imgURL: string;
}

const category: IDummy[] = [
  { title: "가구", imgURL: "123" },
  { title: "전자기기", imgURL: "123" },
  { title: "김태원", imgURL: "123" },
  { title: "이지원", imgURL: "123" },
  { title: "손지예", imgURL: "123" },
  { title: "정상기", imgURL: "123" },
  { title: "우상빈", imgURL: "123" },
  { title: "변유정", imgURL: "123" },
];

export default function SearchPage() {
  return (
    <CategoryContainer>
      <CategoryTitle>카테고리별 검색</CategoryTitle>
      <Grid container columnSpacing={3} rowSpacing={2}>
        {Array.from(category).map((item, index) => (
          <Grid key={index}>
            <CategoryBox>
              <CategoryImg />
              <CategoryDesc>{item.title}</CategoryDesc>
            </CategoryBox>
          </Grid>
        ))}
      </Grid>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  height: 25rem;
`;

const CategoryTitle = styled.div`
  font-size: 1.7rem;
  font-weight: ${theme.fontWeight.bold};
  padding-bottom: 1.5rem;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const CategoryImg = styled.div`
  height: 7rem;
  width: 7rem;
  border-radius: 1rem;
  background-color: ${theme.colors.greyLight};
`;

const CategoryDesc = styled.span`
  font-size: 1.2rem;
  font-weight: ${theme.fontWeight.medium};
  text-align: center;
  padding-top: 0.3rem;
`;
