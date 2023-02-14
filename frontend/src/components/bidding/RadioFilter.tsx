import React from "react";
import RadioMui from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import { styled as mstyled } from "@mui/material/styles";

interface IProps {
  state: "messaging" | "bidding";
  onChange: () => void;
}
export default function RadioFilter(props: IProps) {
  return (
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
      value={props.state}
      defaultValue={props.state}
      onChange={props.onChange}
    >
      <FormControlLabel
        value="messaging"
        control={<Radio />}
        label="채팅하기"
      />
      <FormControlLabel value="bidding" control={<Radio />} label="입찰하기" />
    </RadioGroup>
  );
}

const FormControlLabel = mstyled(MuiFormControlLabel)`
  span {
    font-size: 1.3rem;
  }
`;

const Radio = mstyled(RadioMui)`
  .MuiSvgIcon-root {
    font-size: 2rem;
  }
`;
