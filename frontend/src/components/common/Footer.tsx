import React from "react";
import styles from "./Footer.module.css";
import {
  HomeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
export default function Footer() {
  return (
    <div className={styles.Box}>
      <div className={styles.iconBox}>
        <a href={`/`}>
          <HomeIcon className={styles.icon} />
        </a>
        <p>Home</p>
      </div>
      {/* chat */}
      <div className={styles.iconBox}>
        <a href={`/chat`}>
          <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
        </a>
        <p>Chat</p>
      </div>
      {/* likes */}
      <div className={styles.iconBox}>
        <a href={`/likes`}>
          <HeartIcon className={styles.icon} />
        </a>
        <p>Likes</p>
      </div>
      <div className={styles.iconBox}>
        <a href={`/profile`}>
          <UserIcon className={styles.icon} />
        </a>
        <p>Profile</p>
      </div>
    </div>
  );
}
