import React from "react";
import styled from "styled-components";
import { Button, InputAdornment, TextField } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useNavigate } from "react-router-dom";
import useAuth from "@/store/atoms/useAuth";
import { IUser } from "types/auth";

// FIXME: "Form submission canceled because the form is not connected"
export default function Form() {
  const navigate = useNavigate();
  const { formState, updateUser, confirmUser } = useAuth();

  const updateHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    updateUser(target.name as keyof IUser, target.value);
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!confirmUser()) return alert("필수정보를 모두 입력해주세요");
    navigate("/signup/category");
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <div className="textFieldContainer">
        <TextField
          className="textField"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalShippingOutlinedIcon />
              </InputAdornment>
            ),
          }}
          placeholder="배송지 주소"
          name="address"
          onChange={updateHandler}
          value={formState.user.address}
        />
        <TextField
          className="textField"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceWalletOutlinedIcon />
              </InputAdornment>
            ),
          }}
          placeholder="거래 계좌 정보"
          name="bankAccount"
          onChange={updateHandler}
          value={formState.user.bankAccount}
        />
      </div>
      <div className="btnContainer">
        <Button variant="outlined" disableElevation type="button">
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
