import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";

import { ModalStyle } from "@common/styles";
import { useField } from "@common/hooks";
import { useUsersActions } from "@common/store/hooks";
import { User } from "@common/interfaces/User";
import { useInputTelefono } from "../hooks/useInputTelefono";
import { getUsuarios } from "../services/getUsuarios";
import Swal from "sweetalert2";
import { registrarTutor } from "../services/registrarTutor";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ModalRegistrarForm({ modal }: { modal: any }) {
  const { telefono, setTelefono, handleChangeTelefono } = useInputTelefono("");
  const { setTutores } = useUsersActions();

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

    const newTutor: User = {
      Carne: carnet.props.value,
      Nombre: nombre.props.value,
      Telefono: telefono.value,
      Apellido: apellido.props.value,
      Contrasenia: password.props.value,
      Codigo_RFID: rfid.props.value,
    };

    registrarTutor(newTutor).then((res) => {
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Se ha registrado el tutor exitosamente",
        });
        getUsuarios().then((res) => {
          if (res.status === 200) {
            setTutores(res.auxiliares);
          } else {
            setTutores([]);
            console.log(res);
          }
        });
        formReset();
        modal.handleClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: res.mensaje,
        });
        modal.handleClose();
      }
    });
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
            Registrar Usuario
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1 } }}
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div style={{ textAlign: "center" }}>
              <TextField required {...carnet.props} />
              <TextField required {...nombre.props} />
            </div>
            <div style={{ textAlign: "center" }}>
              <TextField required {...apellido.props} />
              <TextField required {...password.props} />
            </div>
            <div style={{ textAlign: "center" }}>
              <TextField
                required
                type="number"
                placeholder="Telefono"
                {...telefono}
                onChange={handleChangeTelefono}
              />
              <TextField
                required
                {...rfid.props}
                autoComplete="current-password"
              />
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
                Registrar
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
