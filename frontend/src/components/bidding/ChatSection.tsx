import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { IMessage } from "types/auction";
import Message from "./Message";

interface IProps {
  messages: IMessage[];
  email: string;
}

export default function ChatSection(props: IProps) {
  // const myInformation = useRecoilValue(myInformationState);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  return (
    <StyledChatContainer>
      {props.messages.map((msg, idx) => (
        <Message key={idx} msg={msg} isMe={props.email === msg.userEmail} />
      ))}
      <div ref={messagesEndRef}></div>
    </StyledChatContainer>
  );
}

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
