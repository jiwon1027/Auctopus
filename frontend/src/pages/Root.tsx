import React from "react";
import ItemsList from "../components/common/ItemsList";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import styled from "styled-components";
import { theme } from "@/styles/theme";

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

export default function Root() {
  return (
    <>
      <Container>
        <ItemsList />
        <DumDum>dum dum</DumDum>
        <Footer />
      </Container>
    </>
  );
}
const DumDum = styled.div`
  font-size: 5rem;
  color: ${theme.colors.turtleDark};
  font-weight: ${theme.fontWeight.extraBold};
`;
