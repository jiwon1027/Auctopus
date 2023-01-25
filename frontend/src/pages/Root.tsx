import React from "react";
import ItemsList from "../components/common/ItemsList";
// import Footer from "../components/common/Footer";
import styled from "styled-components";
import Header from "@components/common/Header";

export default function Root() {
  return (
    <>
      <Container>
        <Header leftIcon={"none"} />
        <ItemsList />
        {/* <Footer /> */}
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  width: 390px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;
