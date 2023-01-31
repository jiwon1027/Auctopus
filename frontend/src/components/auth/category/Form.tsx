import React, { useState } from "react";
import styled from "styled-components";
import { Button, Chip, Stack } from "@mui/material";
import useAuth from "@/store/atoms/useAuth";
import { IInterest } from "types/auth";
import { useNavigate } from "react-router-dom";

const DUMMY_DATA: IInterest[] = [
  { id: "1", label: "전자기기" },
  { id: "2", label: "패션잡화" },
  { id: "3", label: "도서음반" },
  { id: "4", label: "완구문구" },
  { id: "5", label: "뷰티미용" },
  { id: "6", label: "인테리어" },
  { id: "7", label: "생활용품" },
  { id: "8", label: "기타" },
];

export default function Form() {
  const navigate = useNavigate();
  const { formState, updateUser, confirmUser, resetFormState } = useAuth();

  const chipHandler = (data: IInterest) => {
    const interests = [...formState.user.interests];
    const idx = formState.user.interests.indexOf(data);
    if (idx >= 0) {
      interests.splice(idx, 1);
      updateUser("interests", interests);
      return;
    }

    interests.push(data);
    updateUser("interests", interests);
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!confirmUser()) return alert("필수정보를 모두 입력해주세요");

    // TODO: fetch a request and check that this user is signed up completely :)
    resetFormState();
    navigate("/login");
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <div className="stackContainer">
        <Stack direction="row" spacing={1} className="stack">
          {DUMMY_DATA.map((data) => (
            <CategoryChip
              key={data.id}
              label={data.label}
              onClick={() => chipHandler(data)}
            />
          ))}
        </Stack>
      </div>
      <div className="btnContainer">
        <Button variant="contained" disableElevation type="submit">
          완료
        </Button>
      </div>
    </StyledForm>
  );
}

interface IChipProps {
  label: string;
  onClick: () => void;
}
function CategoryChip({ label, onClick }: IChipProps) {
  const [isActive, setActive] = useState(false);

  const updateChip = () => {
    onClick();
    setActive((prev) => !prev);
  };

  return (
    <Chip
      label={label}
      color="primary"
      variant={isActive ? "filled" : "outlined"}
      onClick={updateChip}
      sx={{ border: "1px solid", marginBottom: "1rem", fontSize: "1.2rem" }}
    />
  );
}

const StyledForm = styled.form`
  flex: 5;
  display: flex;
  flex-direction: column;

  .stackContainer {
    flex: 3;
    .stack {
      flex-wrap: wrap;
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
      /* margin: auto; */
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
