/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";

import { ModalStyle } from "@common/styles/ModalStyle";
import { useField } from "@common/hooks/useField";
import { useUsersActions } from "@common/store/hooks/useUsersActions";
import { User } from "@common/interfaces/User";
import { useInputTelefono } from "../hooks/useInputTelefono";

export default function ModalUpdateForm({
  modal,
  tutor,
}: {
  modal: any;
  tutor: User;
}) {
  const { telefono, setTelefono, handleChangeTelefono } = useInputTelefono("");
  const { updateTutor } = useUsersActions();

  const carnet = useField("text", "Carnet", "");
  const nombre = useField("text", "Nombre", "");
  const apellido = useField("text", "Apellido", "");
  const password = useField("password", "Password", "");
  const rfid = useField("text", "RFID", "");

  function formReset() {
    carnet.setValue("");
    nombre.setValue("");
    apellido.setValue("");
    password.setValue("");
    rfid.setValue("");
    setTelefono({ value: "", error: false, helperText: "" });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const tutorInfo: User = {Id_auxiliar: tutor.Id_auxiliar};
    if (carnet.props.value != "") tutorInfo.Carne = carnet.props.value;
    if (nombre.props.value != "") tutorInfo.Nombre = nombre.props.value;
    if (apellido.props.value != "") tutorInfo.Apellido = apellido.props.value;
    if (password.props.value != "") tutorInfo.Contrasenia = password.props.value;
    if (telefono.value != "") tutorInfo.Telefono = telefono.value;
    if (rfid.props.value != "") tutorInfo.Codigo_RFID = rfid.props.value;

    updateTutor(tutorInfo);
    formReset();
    modal.handleClose();
  }

  return (
    <>
      <Modal
        open={modal.open}
        onClose={modal.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Actualizar Usuario
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1 } }}
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div style={{ textAlign: "center" }}>
              <TextField {...carnet.props} placeholder={tutor.Carne} />
              <TextField {...nombre.props} placeholder={tutor.Nombre} />
            </div>
            <div style={{ textAlign: "center" }}>
              <TextField {...apellido.props} placeholder={tutor.Apellido}/>
              <TextField {...password.props} />
            </div>
            <div style={{ textAlign: "center" }}>
              <TextField
                type="number"
                placeholder={tutor.Telefono}
                label="Telefono"
                {...telefono}
                onChange={handleChangeTelefono}
              />
              <TextField {...rfid.props} placeholder={tutor.Codigo_RFID} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1rem",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                type="submit"
                sx={{ maxWidth: "100%" }}
              >
                Actualizar
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
