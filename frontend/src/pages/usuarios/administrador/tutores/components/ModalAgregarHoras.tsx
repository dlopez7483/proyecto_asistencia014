/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ModalStyle } from "@common/styles";
import { useAppSelector } from "@common/store/hooks";
import { useState } from "react";
import { Dayjs } from "dayjs";
import Swal from "sweetalert2";
import { postAddHour } from "../services/postAddHour";

interface NewHoraExtra {
  fecha: Dayjs | null;
  Hora_entrada: Dayjs | null;
  Hora_salida: Dayjs | null;
}

const slotProps = {
  textField: {
    required: true,
    fullWidth: true,
    sx: {
      "& .MuiInputBase-root": {
        width: "100%",
      },
    },
  },
};

export default function ModalAgregarHoras({ modal }: { modal: any }) {
  const { currentTutor } = useAppSelector((state) => state.tutores);
  const [newHoraExtra, setNewHoraExtra] = useState<NewHoraExtra>({
    fecha: null,
    Hora_entrada: null,
    Hora_salida: null,
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newHoraExtra.Hora_salida?.isAfter(newHoraExtra.Hora_entrada!)) {
      const data = {
        fecha: newHoraExtra.fecha?.format("YYYY-MM-DD"),
        hora_entrada: newHoraExtra.Hora_entrada?.format("HH:mm:ss"),
        hora_salida: newHoraExtra.Hora_salida?.format("HH:mm:ss"),
        id_tutor: currentTutor.Id_auxiliar,
      };

      postAddHour(data).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Exito",
            text: "Horas extra registradas correctamente",
          });
          modal.handleClose();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.mensaje,
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La hora de salida debe ser mayor a la hora de entrada",
      });
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        open={modal.open}
        onClose={modal.handleClose}
        aria-labelledby="modal-extra-hours-title"
        aria-describedby="modal-modal-extra-hours-description"
      >
        <Box sx={ModalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Ingresar Horas Extra
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1 } }}
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div style={{ textAlign: "center" }}>
              <DatePicker
                label="Fecha"
                format="DD/MM/YYYY"
                value={newHoraExtra.fecha}
                onChange={(newValue) =>
                  setNewHoraExtra((prev) => ({ ...prev, fecha: newValue }))
                }
                slotProps={slotProps}
              />
            </div>
            <div style={{ textAlign: "center", margin: "1rem 0" }}>
              <TimePicker
                label="Hora de entrada"
                value={newHoraExtra.Hora_entrada}
                onChange={(newValue) =>
                  setNewHoraExtra((prev) => ({
                    ...prev,
                    Hora_entrada: newValue,
                  }))
                }
                slotProps={slotProps}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <TimePicker
                label="Hora de salida"
                value={newHoraExtra.Hora_salida}
                onChange={(newValue) =>
                  setNewHoraExtra((prev) => ({
                    ...prev,
                    Hora_salida: newValue,
                  }))
                }
                slotProps={slotProps}
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
    </LocalizationProvider>
  );
}
