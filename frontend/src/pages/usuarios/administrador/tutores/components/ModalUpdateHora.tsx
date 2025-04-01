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
import { updateHorario } from "../services/updateHorario";

export default function ModalUpdateHora({
  modal,
  setUserData,
}: {
  modal: any;
  setUserData: any;
}) {
  const currentTutor = useAppSelector((state) => state.tutores.currentTutor);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(modal.data);
    console.log(currentTutor.Carne);

    updateHorario(modal.data, String(currentTutor.Carne), modal.data.Id_horario).then(
      (res) => {
        if (res.status === 200) {
          setUserData((prevState: any) => ({
            ...prevState,
            rows: prevState.rows.map((row: any) => {
              if (row.Id_horario === modal.data.Id_horario) {
                return {
                  ...row,
                  Dia_semana: modal.data.Dia_semana,
                  Hora_entrada: modal.data.Hora_entrada,
                  Hora_salida: modal.data.Hora_salida,
                };
              }
              return row;
            }),
          }));
          modal.handleClose();
        } else {
          console.log("Error al actualizar horario:", res);
        }
      }
    );
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
            Actualizar Horario
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
                Actualizar
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
