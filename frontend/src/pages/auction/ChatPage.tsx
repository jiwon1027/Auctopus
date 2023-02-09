import React from "react";
import { useLocation } from "react-router-dom";

export default function ChatPage() {
  const location = useLocation();
  const navData = location.state;
  console.log(navData);
  return (
    <>
      <h1>Chat</h1>
    </>
  );
}
