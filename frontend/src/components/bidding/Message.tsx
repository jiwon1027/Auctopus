import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { IMessage } from "types/auction";

interface IProps {
  msg: IMessage;
  isMe: boolean;
}

export default function Message(props: IProps) {
  return (
    <StyledMessage isMe={props.isMe}>
      <div className="messageContainer">
        <div className="message">
          <Avatar {...stringAvatar(props.msg.nickname)} />
          <div className="message__content">
            {props.msg.nickname} <br /> {props.msg.message}
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
