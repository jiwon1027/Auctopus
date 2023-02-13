import React from "react";
import { theme } from "@/styles/theme";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import img1 from "@/assets/category/001.png";
import img2 from "@/assets/category/002.png";
import img3 from "@/assets/category/003.png";
import img4 from "@/assets/category/004.png";
import img5 from "@/assets/category/005.png";
import img6 from "@/assets/category/006.png";
import img7 from "@/assets/category/007.png";
import img8 from "@/assets/category/008.png";

interface IData {
  title: string;
  imgURL: string;
  value: number;
}

const category: IData[] = [
  { title: "전자기기", imgURL: img1, value: 1 },
  { title: "패션잡화", imgURL: img2, value: 2 },
  { title: "도서/음반", imgURL: img3, value: 3 },
  { title: "완구문구", imgURL: img4, value: 4 },
  { title: "뷰티미용", imgURL: img5, value: 5 },
  { title: "인테리어", imgURL: img6, value: 6 },
  { title: "생활용품", imgURL: img7, value: 7 },
  { title: "기타", imgURL: img8, value: 8 },
];

interface IProps {
  category: string;
  onChangeCategory: (val: string) => void;
}

export default function Category(props: IProps) {
  const onClickEvent = (title: number) => {
    props.onChangeCategory(title.toString());
  };

  return (
    <CategoryContainer>
      <CategoryTitle>카테고리별 검색</CategoryTitle>
      <Grid container columnSpacing={3} rowSpacing={2}>
        {category.map((item, index) => (
          <Grid key={index}>
            <CategoryBox onClick={() => onClickEvent(item.value)}>
              <CategoryImg src={item.imgURL} />
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

const CategoryImg = styled.img`
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
