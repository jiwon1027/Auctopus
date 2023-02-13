import React from "react";
import styled from "styled-components";
import { IMessage } from "types/auction";

interface IProps {
  msg: IMessage;
}

export default function Bid(props: IProps) {
  return (
    <StyledBid>{`${props.msg.nickname} 님이 ${props.msg.message} 원 입찰하셨습니다`}</StyledBid>
  );
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
