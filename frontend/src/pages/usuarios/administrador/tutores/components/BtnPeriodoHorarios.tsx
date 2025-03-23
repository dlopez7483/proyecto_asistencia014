import { Button, ButtonGroup, Chip, Paper, Typography } from "@mui/material";
import { changeEstadoPeriodoHorarios } from "../services";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Label } from "@mui/icons-material";

export default function BtnPeriodoHorarios() {
  const {
    habilitar_periodo_horarios,
    deshabilitar_periodo_horarios,
    getEstadoPeriodoHorarios,
  } = changeEstadoPeriodoHorarios();
  const [estado, setEstado] = useState({
    label: "Desconocido",
    color: "default",
  });

  useEffect(() => {
    getEstadoPeriodoHorarios().then((response) => {
      if (response.status === 200) {
        setEstado({
          label: response.estado,
          color: response.estado == "habilitado" ? "success" : "error",
        });
      } else {
        setEstado({
          label: "Desconocido",
          color: "default",
        });
      }
    });
  }, []);

  const handleHabilitar = () => {
    habilitar_periodo_horarios().then((response) => {
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Periodo de horarios habilitado",
          showConfirmButton: false,
          timer: 1500,
        });
        setEstado({
          label: "habilitado",
          color: "success",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al habilitar el periodo de horarios",
          text: response.mensaje,
        });
      }
    });
  };

  const handleDeshabilitar = () => {
    deshabilitar_periodo_horarios().then((response) => {
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Periodo de horarios deshabilitado",
          showConfirmButton: false,
          timer: 1500,
        });
        setEstado({
          label: "deshabilitado",
          color: "error",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al deshabilitar el periodo de horarios",
          text: response.mensaje,
        });
      }
    });
  };

  return (
    <Paper sx={{ padding: "10px", margin: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h5" sx={{ mr: "10px" }}>
        Periodo de Horarios
        <Chip sx={{ ml: 1 }} {...estado} variant="outlined" />
      </Typography>
      <ButtonGroup variant="text">
        <Button onClick={() => handleHabilitar()}>Habilitar</Button>
        <Button color="error" onClick={() => handleDeshabilitar()}>
          Deshabilitar
        </Button>
      </ButtonGroup>
    </Paper>
  );
}
