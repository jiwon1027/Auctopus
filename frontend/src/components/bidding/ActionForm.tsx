import React, { useState } from "react";
import { TextField } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import styled from "styled-components";

interface IProps {
  onSend: (type: number, chat: string) => void;
}

export default function ActionForm(props: IProps) {
  const [chat, setChat] = useState("");
  const onChangeMsg = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setChat(target.value);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const trimmed = chat.trim();
    if (!trimmed) return;
    props.onSend(1, trimmed);
    setChat("");
  };

  return (
    <StyledActionForm onSubmit={onSubmit}>
      {/* TODO: add a radio button to swap between chatting and bidding */}
      <TextField
        fullWidth
        id="fullWidth"
        sx={{ backgroundColor: "white" }}
        value={chat}
        onChange={onChangeMsg}
      />
      <SendOutlinedIcon
        color="secondary"
        sx={{ width: "4rem", height: "4rem", marginLeft: "2rem" }}
      />
    </StyledActionForm>
  );
}

const StyledActionForm = styled.form`
  display: flex;
  align-items: center;
  padding-bottom: 3rem;

  input {
    font-size: 2rem;
  }
`;
