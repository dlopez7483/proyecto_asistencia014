import React from "react";

export const useField = (
  type: string,
  id: string,
  initialValue: string,
  customLabel?: string,
  customName?: string
) => {
  const [value, setValue] = React.useState(initialValue);
  const label = customLabel || id;
  const name = customName || id;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    props: {
      type,
      id,
      label,
      name,
      value,
      onChange,
    },
    setValue,
  };
};
