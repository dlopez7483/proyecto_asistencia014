import React from "react";

export const useInputTelefono = (initialValue: string) => {
  const [telefono, setTelefono] = React.useState({
    value: initialValue,
    error: false,
    helperText: "",
  });

  const handleChangeTelefono = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setTelefono((prevTelefono) => ({
      ...prevTelefono,
      value: newValue,
      error: newValue.length < 8,
      helperText: newValue.length < 8 ? "Telefono invalido" : "",
    }));

  };

  return {
    telefono,
    handleChangeTelefono,
    setTelefono
  };
};
