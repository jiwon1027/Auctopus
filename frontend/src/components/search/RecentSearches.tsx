import React from "react";
import { theme } from "@/styles/theme";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";

export default function RecentSearches() {
  return (
    <RecentContainer>
      <RecentTitle>최근 검색 기록</RecentTitle>
      가나다라
    </RecentContainer>
  );
}

const RecentContainer = styled.div`
  height: 25rem;
`;

const RecentTitle = styled.div`
  font-size: 1.7rem;
  font-weight: ${theme.fontWeight.bold};
  padding-bottom: 1.5rem;
`;
