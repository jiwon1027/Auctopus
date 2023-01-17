import React from "react";
import styles from "./Root.module.css";
import ItemsList from "../components/common/ItemsList";
import Header from "../components/common/Header";

export default function Root() {
  return (
    <>
      <Header />
      <div className={styles.root}>
        <div className="header bg-turtle-standard h-14"> Header</div>
        <div className="content">
          <ItemsList />
        </div>
        <div className="footer bg-turtle-standard h-16">Footer</div>
      </div>
    </>
  );
}
