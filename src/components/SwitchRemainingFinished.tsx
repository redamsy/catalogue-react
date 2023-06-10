import * as React from "react";
import Switch from "@mui/material/Switch";

export default function SwitchRemainingFinished({
  checked,
  handleChange,
}: {
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
