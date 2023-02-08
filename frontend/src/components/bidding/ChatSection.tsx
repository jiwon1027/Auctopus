import React from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
const messages = [
  { name: "김태원", content: "에어팟 얼마?", isMe: false },
  { name: "Jed Watson", content: "에어팟 얼마?", isMe: true },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
  { name: "Tim Neutkens", content: "에어팟 얼마?", isMe: false },
];

export default function ChatSection() {
  return (
    <StyledChatContainer>
      {messages.map((msg, idx) => (
        <Message
          key={idx}
          name={msg.name}
          content={msg.content}
          isMe={msg.isMe}
        />
      ))}
    </StyledChatContainer>
  );
}

interface IMessage {
  name: string;
  content: string;
  isMe: boolean;
}

function Message(props: IMessage) {
  return (
    <StyledMessage isMe={props.isMe}>
      <div className="messageContainer">
        <div className="message">
          <Avatar {...stringAvatar(props.name)} />
          <div className="message__content">
            {props.name} <br /> {props.content}
          </div>
        </div>
      </div>
    </StyledMessage>
  );
}

const StyledMessage = styled.div<{ isMe: boolean }>`
  display: flex;
  justify-content: ${(props) => props.isMe && "flex-end"};

  .messageContainer {
    display: inline-block;
    background: ${(props) =>
      props.isMe ? "#386641" : "rgba(167, 201, 87, 0.2)"};
    border-radius: 10px;
    padding: 3px;
    margin-bottom: 1rem;

    .message {
      display: flex;
      align-items: center;
    }

    .message__content {
      margin-left: 5px;
      color: ${(props) => props.isMe && "white"};
    }
  }
`;

const StyledChatContainer = styled.section`
  flex: 1;
  margin-top: 2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children:
      name.split(" ").length >= 2
        ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        : name.charAt(0),
  };
}
