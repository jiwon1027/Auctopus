import React from "react";
import styles from "./Header.module.css";
import {
  // ChevronLeftIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function Header() {
  return (
    <div className={styles.header}>
      {/* <ChevronLeftIcon className="h-6 w-6 " onClick={() => navigate(-1)} /> */}
      <h1 className={styles.mainTitle}>Auctopus</h1>
      <div className={styles.leftBox}>
        <BellIcon className="h-6 w-6 " />
        <MagnifyingGlassIcon className="h-6 w-6" />
      </div>
    </div>
  );
}

export default Header;
