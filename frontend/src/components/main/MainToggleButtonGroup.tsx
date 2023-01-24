import * as React from "react";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { Link, useLocation } from "react-router-dom";

export default function MainToggleButtonGroup() {
  const [alignment, setAlignment] = React.useState("live");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="Platform"
      sx={{ paddingY: 2, marginX: 4 }}
    >
      <ToggleButton value="live">
        <Link style={{ textDecoration: "none" }} to="/1">
          진행중
        </Link>
      </ToggleButton>
      <ToggleButton value="nonlive">진행 예정</ToggleButton>
    </ToggleButtonGroup>
  );
}

const ToggleButton = mstyled(MuiToggleButton)({
  width: "17rem",
  height: "5rem",
  fontSize: "1.6rem",
  borderRadius: "15px",
  border: `solid 1.5px ${theme.colors.turtleStandard}`,
  fontWeight: `${theme.fontWeight.medium}`,
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: `${theme.colors.turtleStandard}`,
    fontWeight: `${theme.fontWeight.medium}`,
  },
});
