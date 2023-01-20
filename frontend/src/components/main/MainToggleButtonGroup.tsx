import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";

export default function MainToggleButtonGroup() {
  const [alignment, setAlignment] = React.useState("live");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="success"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ paddingY: 2, marginX: 4 }}
    >
      <CustomToogleButton value="live">진행중</CustomToogleButton>
      <CustomToogleButton value="nonlive">진행 예정</CustomToogleButton>
    </ToggleButtonGroup>
  );
}

const CustomToogleButton = mstyled(ToggleButton)`
  width: 170px;
  /* background-color: ${(props) => (props.ariaPressed ? "red" : "white")} */
`;
