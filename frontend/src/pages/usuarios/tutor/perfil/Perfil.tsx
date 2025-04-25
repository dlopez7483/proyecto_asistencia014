/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from "@common/hooks";
import { useAppSelector } from "@common/store/hooks";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useInputTelefono } from "../../administrador/tutores/hooks/useInputTelefono";
import { useEffect } from "react";
import { getTutorData } from "./services/getTutorData";
import { usePerfil } from "./hooks/usePerfil";

export default function PerfilAux() {
  const { telefono, setTelefono, handleChangeTelefono } = useInputTelefono("");
  const { auth } = useAppSelector((state) => state);
  const { handleUpdate } = usePerfil();

  const carnet = useField("text", "Carnet", "");
  const nombre = useField("text", "Nombre", "");
  const apellido = useField("text", "Apellido", "");
  const password = useField("password", "Password", "");

  useEffect(() => {
    getTutorData(auth.carne).then((response) => {
      carnet.setValue(response.Carne);
      nombre.setValue(response.Nombre);
      apellido.setValue(response.Apellido);
      setTelefono({ ...telefono, value: response.Telefono });
    });
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data: Map<string, string | number> = new Map();

    if (carnet.props.value !== "") data.set("carne_nuevo", carnet.props.value);
    if (nombre.props.value !== "") data.set("nombre", nombre.props.value);
    if (apellido.props.value !== "") data.set("apellido", apellido.props.value);
    if (telefono.value !== "") data.set("telefono", telefono.value);
    if (password.props.value !== "")
      data.set("contrasenia", password.props.value);
    if (telefono.value !== "") data.set("telefono", telefono.value);

    handleUpdate(data, auth);
  }

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ mb: 2 }}
      >
        Actualizar Perfil
      </Typography>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { margin: "10px 0" } }}
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField {...carnet.props} fullWidth />
        <TextField {...nombre.props} fullWidth />
        <TextField {...apellido.props} fullWidth />
        <TextField {...password.props} fullWidth />
        <TextField
          type="number"
          label="Telefono"
          {...telefono}
          onChange={handleChangeTelefono}
          fullWidth
        />
        <Button variant="outlined" color="success" type="submit" fullWidth>
          Actualizar
        </Button>
      </Box>
    </>
  );
}
