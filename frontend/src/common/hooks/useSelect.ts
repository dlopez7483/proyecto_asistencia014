import { SelectChangeEvent } from "@mui/material";
import React from "react";

export const useSelect = (id: string, initialValue: string) => {
  const [value, setValue] = React.useState(initialValue);
  const label = id;
  const name = id;

  const onChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return {
    id,
    label,
    name,
    value,
    onChange,
  };
};
