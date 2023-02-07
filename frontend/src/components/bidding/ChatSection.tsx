import React from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";

const messages = [
  { name: "Kent Dodds", content: "에어팟 얼마?" },
  { name: "Jed Watson", content: "에어팟 얼마?" },
  { name: "Tim Neutkens", content: "에어팟 얼마?" },
];

export default function ChatSection() {
  return (
    <StyledChatContainer>
      {messages.map((msg, idx) => (
        <Message key={idx} name={msg.name} content={msg.content} />
      ))}
    </StyledChatContainer>
  );
}

interface IMessage {
  name: string;
  content: string;
}

function Message(props: IMessage) {
  return (
    <StyledMessage>
      <Avatar {...stringAvatar(props.name)} />
      <div>
        {props.name} <br /> {props.content}
      </div>
    </StyledMessage>
  );
}

const StyledMessage = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.turtleLight};
  border-radius: 10px;
`;

const StyledChatContainer = styled.section`
  flex: 1;
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
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
