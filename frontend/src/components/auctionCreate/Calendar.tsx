import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
// import { Container } from "@mui/joy";

export default function Calendar() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const color = '#386641';
  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={params => <TextField {...params} fullWidth sx={{ border: { color } }} />}
          disablePast={true}
        />
      </LocalizationProvider>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
`;
