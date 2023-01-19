import React from "react";
import styles from "./Root.module.css";
import ItemsList from "../components/common/ItemsList";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import styled from "styled-components";
import { theme } from "@/styles/theme";
export default function Root() {
  return (
    <>
      <div className={styles.root}>
        <Header />
        <ItemsList />
        <DumDum>dum dum</DumDum>
        <Footer />
      </div>
    </>
  );
}
const DumDum = styled.div`
  font-size: 5rem;
  color: ${theme.colors.turtleDark};
  font-weight: ${theme.fontWeight.extraBold};
`;
