import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import styled from "styled-components";
import RadioFilter from "./RadioFilter";

interface IProps {
  auctionInfo: IAuctionDetail;
  top: { topBidder: string; topPrice: number };
  onSend: (type: number, chat: string) => void;
}

export default function ActionForm(props: IProps) {
  const [chat, setChat] = useState("");
  const [bidPrice, setBidPrice] = useState<number | null>();
  const [radioState, setRadioState] = useState<"messaging" | "bidding">(
    "messaging"
  );

  useEffect(() => {
    setBidPrice(props.top.topPrice);
  }, [props.top.topPrice]);

  const isMessaging = radioState === "messaging";

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!bidPrice) return;
    if (!!bidPrice && props.top.topPrice >= bidPrice) {
      return;
    }

    const trimmed = isMessaging ? chat.trim() : (bidPrice as number).toString();
    if (!trimmed) return;
    props.onSend(isMessaging ? 1 : 2, trimmed);
    setChat("");
  };

  const onChangeMsg = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setChat(target.value);
  };

  const onChangeBidPrice = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setBidPrice(target.value === "" ? null : Number(target.value));
  };

  const onChangeRadioState = () => {
    setRadioState((prev) => (prev === "messaging" ? "bidding" : "messaging"));
  };

  return (
    <StyledActionForm onSubmit={onSubmit}>
      <RadioFilter state={radioState} onChange={onChangeRadioState} />
      {isMessaging ? (
        <TextField
          fullWidth
          id="fullWidth"
          sx={{ backgroundColor: "white" }}
          value={chat}
          onChange={onChangeMsg}
        />
      ) : (
        <TextField
          fullWidth
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={bidPrice}
          onChange={onChangeBidPrice}
          draggable
          color={
            !!bidPrice &&
            (props.top.topPrice || props.auctionInfo.startPrice) < bidPrice
              ? "primary"
              : "error"
          }
          inputProps={{
            step: props.auctionInfo.bidUnit,
            min: props.top.topPrice || props.auctionInfo.startPrice,
          }}
        />
      )}
      <SendOutlinedIcon
        color="secondary"
        sx={{ width: "4rem", height: "4rem", marginLeft: "2rem" }}
        onClick={onSubmit}
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
