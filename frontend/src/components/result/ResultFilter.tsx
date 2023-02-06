import React from "react";
import RadioMui from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import { styled as mstyled } from "@mui/material/styles";
import { IAuction } from "types/auction";

interface MainProps {
  live: "live" | "nonLive";
  onClick: () => void;
  setAuctionList: React.Dispatch<React.SetStateAction<IAuction[]>>;
}

export default function ResultFilter(props: MainProps) {
  const handleAlignment = (
    event: React.ChangeEvent<HTMLElement>,
    value: string
  ) => {
    props.onClick();
    // TODO: state별로 API 설정할 것
  };

  return (
    <RadioGroup
      row
      sx={{ display: "flex", justifyContent: "end" }}
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
      value={props.live}
      defaultValue={props.live}
      onChange={handleAlignment}
    >
      <FormControlLabel value="live" control={<Radio />} label="진행중" />
      <FormControlLabel value="nonLive" control={<Radio />} label="진행예정" />
    </RadioGroup>
  );
}

const FormControlLabel = mstyled(MuiFormControlLabel)`
  margin-right: 0;
  margin-left: 0.5rem;

  span {
    font-size: 1.3rem;
  }

  .MuiButtonBase-root {
    padding: 0.4rem;
  }
`;

const Radio = mstyled(RadioMui)`
  .MuiSvgIcon-root {
    font-size: 2rem;
  }
`;
