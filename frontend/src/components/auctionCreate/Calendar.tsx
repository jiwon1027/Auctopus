import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

export default function Calendar({
  data,
  onChange,
}: {
  data: IAuctionCreate;
  onChange: (name: string, value: object) => void;
}) {
  const handleChange = (newValue: string | null) => {
    console.log(revertKST(newValue?.toString() as string));
    onChange("startTime", revertKST(newValue?.toString() as string));
  };
  const revertKST = (time: string) => {
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    console.log(new Date(time + KR_TIME_DIFF));
    return new Date(time + KR_TIME_DIFF);
  };
  const color = "#386641";
  console.log(revertKST(data.startTime));
  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="경매시작날짜"
          value={revertKST(data.startTime)}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} fullWidth sx={{ border: { color } }} />
          )}
          disablePast={true}
        />
      </LocalizationProvider>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 2rem;
  width: 100%;

  .MuiFormLabel-root {
    font-size: 14px;
  }

  .MuiInputBase-input {
    font-size: 15px;
  }
`;
