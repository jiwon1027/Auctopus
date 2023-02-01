import React from "react";
import Input from "@mui/joy/Input";
import styled from "styled-components";
export default function Content() {
  return (
    <Container>
      <Input placeholder="검색어를 입력하세요." variant="outlined" />
    </Container>
  );
}

const Container = styled.div``;
