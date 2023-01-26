import React from "react";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface IData {
  index: number;
  text: string;
}

const searchData: IData[] = [
  {
    index: 1,
    text: "어에팟 프로2",
  },
  {
    index: 2,
    text: "LG 60인치 TV",
  },
  {
    index: 3,
    text: "LP판",
  },
  {
    index: 4,
    text: "아이폰14 프로 맥스 256G",
  },
  {
    index: 5,
    text: "삼성 노트북",
  },
  {
    index: 6,
    text: "뉴진스 LG 그램",
  },
];

export default function RecentSearches() {
  const handleClick = (text: string) => {
    console.info(text + " Clikced!");
  };

  const handleDelete = (text: string) => {
    console.info(text + " Deleted!");
  };
  return (
    <RecentContainer>
      <RecentTitle>최근 검색 기록</RecentTitle>
      <div className="stackContainer">
        <Stack className="stack" direction="row" spacing={1}>
          {searchData.map((item) => (
            <Chip
              variant="outlined"
              color="success"
              key={item.index}
              label={item.text}
              onClick={() => handleClick(item.text)}
              onDelete={() => handleDelete(item.text)}
              sx={{ fontSize: 12 }}
            />
          ))}
        </Stack>
      </div>
    </RecentContainer>
  );
}

const RecentContainer = styled.div`
  display: flex;
  flex-direction: column;

  .stackContainer {
    flex: 1;
    .stack {
      flex-wrap: wrap;
      .MuiButtonBase-root {
        margin-bottom: 1rem;
      }
    }
  }
`;

const RecentTitle = styled.div`
  font-size: 1.7rem;
  font-weight: ${theme.fontWeight.bold};
  padding-bottom: 1.5rem;
`;
