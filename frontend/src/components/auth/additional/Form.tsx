import React, { useRef } from "react";
import styled from "styled-components";
import { Button, InputAdornment, TextField } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

export default function Form() {
  const addressRef = useRef(null);
  const bankAccountRef = useRef(null);

  return (
    <StyledForm method="POST" onSubmit={() => console.log("submit")}>
      <div className="textFieldContainer">
        <TextField
          ref={addressRef}
          className="textField"
          // label="Email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalShippingOutlinedIcon />
              </InputAdornment>
            ),
          }}
          placeholder="배송지 주소"
          required
          name="address"
        />
        <TextField
          ref={bankAccountRef}
          className="textField"
          // label="Email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceWalletOutlinedIcon />
              </InputAdornment>
            ),
          }}
          placeholder="거래 계좌 정보"
          required
          name="bank-account"
        />
      </div>
      <div className="btnContainer">
        <Button variant="outlined" disableElevation type="submit">
          건너뛰기
        </Button>
        <Button variant="contained" disableElevation type="submit">
          완료
        </Button>
      </div>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  flex: 5;
  display: flex;
  flex-direction: column;

  .textFieldContainer {
    flex: 3;
    .textField {
      width: 100%;
      margin-bottom: 3rem;

      fieldset {
        border-radius: 1rem;
      }
      input {
        font-size: 1.8rem;
      }
    }
  }

  .btnContainer {
    flex: 2;
    display: flex;
    justify-content: space-around;

    button {
      flex: 1;
      padding: 1rem;
      font-size: 1.8rem;
      border-radius: 1rem;
      margin-bottom: auto;

      &:first-child {
        margin-right: 1.25rem;
      }
      &:last-child {
        margin-left: 1.25rem;
      }
    }
  }
`;
