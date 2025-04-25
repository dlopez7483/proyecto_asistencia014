import React from "react";

export const useInputTelefono = (initialValue: string) => {
  const [telefono, setTelefono] = React.useState({
    value: initialValue,
    error: false,
    helperText: "",
  });

  const validarTelefono = (value: string) => {
    const telefonoRegex = /^\d{8}$/;
    return !telefonoRegex.test(value);
  };

  const handleChangeTelefono = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const isNotValid = validarTelefono(newValue);

    setTelefono((prevTelefono) => ({
      ...prevTelefono,
      value: newValue,
      error: isNotValid,
      helperText: isNotValid ? "Telefono invalido" : "",
    }));
  };

  return {
    telefono,
    handleChangeTelefono,
    setTelefono,
  };
};
