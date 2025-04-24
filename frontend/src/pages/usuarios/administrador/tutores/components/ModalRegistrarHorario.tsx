/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { ModalStyle } from "@common/styles";
import { useAppSelector } from "@common/store/hooks";
import { postSchedule } from "../services/postSchedule";
import Swal from "sweetalert2";

export default function ModalRegistrarForm({ modal }: { modal: any }) {
  const { currentTutor } = useAppSelector((state) => state.tutores);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    postSchedule(modal.data, currentTutor.Carne || "").then((res) => {
      if (res.status === 200) {
        modal.handleClose();
        modal.setData({
          Dia_semana: "",
          Hora_entrada: "",
          Hora_salida: "",
        });
        Swal.fire({
          icon: "success",
          title: "Horario registrado",
          text: "El horario se ha registrado correctamente.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.message,
          showConfirmButton: true,
        });
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
            Ingresar Horario
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1 } }}
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div style={{ textAlign: "center" }}>
              <FormControl fullWidth>
                <InputLabel id="select-dia-label">Dia de la Semana</InputLabel>
                <Select
                  labelId="select-dia"
                  id="demo-simple-select"
                  value={modal.data.Dia_semana}
                  label="Dia de la Semana"
                  onChange={(e) => {
                    modal.setData({
                      ...modal.data,
                      Dia_semana: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="Lunes">Lunes</MenuItem>
                  <MenuItem value="Martes">Martes</MenuItem>
                  <MenuItem value="Miércoles">Miércoles</MenuItem>
                  <MenuItem value="Jueves">Jueves</MenuItem>
                  <MenuItem value="Viernes">Viernes</MenuItem>
                  <MenuItem value="Sábado">Sábado</MenuItem>
                  <MenuItem value="Domingo">Domingo</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ textAlign: "center", margin: "1rem 0" }}>
              <input
                className="form-control"
                type="time"
                name="hora_inicio"
                value={modal.data.Hora_entrada}
                onChange={(e) => {
                  modal.setData({
                    ...modal.data,
                    Hora_entrada: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <input
                className="form-control"
                type="time"
                name="hora_fin"
                value={modal.data.Hora_salida}
                onChange={(e) => {
                  modal.setData({
                    ...modal.data,
                    Hora_salida: e.target.value,
                  });
                }}
                required
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
