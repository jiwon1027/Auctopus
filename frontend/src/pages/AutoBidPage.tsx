import React from "react";
import Notice from "@components/autobid/Notice";
import Header from "@components/common/Header";
import Content from "@components/autobid/Content";
import InputBox from "@components/autobid/InputBox";

import styled from "styled-components";
export default function AutoBid() {
  return (
    <Layout>
      <Header />
      <Notice />
      <Content />
      <InputBox />
    </Layout>
  );
}

const Layout = styled.div`
  background-color: white;
  width: 39rem;
  height: 100vh;
  margin: 0 auto;
`;
