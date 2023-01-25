import React, { useState } from "react";
import styled from "styled-components";
import { Button, Chip, Stack } from "@mui/material";

interface IData {
  id: number;
  label: string;
}
const DUMMY_DATA: IData[] = [
  { id: 1, label: "전자 기기" },
  { id: 2, label: "전자 음향 기기" },
  { id: 3, label: "고래 상어" },
  { id: 4, label: "옷" },
  { id: 5, label: "한정판 슈즈" },
  { id: 6, label: "애플" },
  { id: 7, label: "고래 상어" },
  { id: 8, label: "애플" },
];

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

export default function Form() {
  const [chips, setChips] = useState<IData[]>([]);

  const chipHandler = (data: IData) => {
    const idx = chips.indexOf(data);
    if (idx >= 0) {
      setChips((prev) => {
        prev.splice(idx, 1);
        return prev;
      });
      return;
    }

    setChips((prev) => {
      prev.push(data);
      return prev;
    });
  };

  return (
    <StyledForm method="POST" onSubmit={() => console.log("submit")}>
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
