import React from "react";
import styles from "./Root.module.css";
import ItemsList from "../components/common/ItemsList";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
export default function Root() {
  return (
    <>
      <div className={styles.root}>
        <Header />
        <ItemsList />
        <div className="content"></div>
        <Footer />
      </div>
    </>
  );
}
