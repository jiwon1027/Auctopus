import React from "react";
import styles from "./Header.module.css";
import {
  // ChevronLeftIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ReactComponent as Turtle } from "../../assets/badges/turtle.svg";

function Header() {
  return (
    <div className={styles.header}>
      {/* <ChevronLeftIcon className="h-6 w-6 " onClick={() => navigate(-1)} /> */}
      <Turtle className="w-14 h-10" />
      <div className="w-14 flex flex-row justify-between">
        <BellIcon className="h-6 w-6 " />
        <MagnifyingGlassIcon className="h-6 w-6" />
      </div>
    </div>
  );
}

export default Header;
