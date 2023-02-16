import React from "react";
import styled from "styled-components";
import { IMessage } from "types/auction";

interface IProps {
  msg: IMessage;
}

export default function Alert(props: IProps) {
  const state =
    props.msg.type === 2
      ? `${props.msg.nickname} 님이 ${props.msg.message
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원 입찰하셨습니다`
      : props.msg.message;
  return <StyledBid>{state}</StyledBid>;
}

const StyledBid = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.colors.greyDim};
  opacity: 0.4;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  margin-bottom: 1rem;
`;
