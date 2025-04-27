import {
  Button,
  Chip,
  ChipPropsColorOverrides,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { OverridableStringUnion } from "@mui/types";
import { servicesEstadoSalidas } from "../services/servicesEstadoSalidas";

export default function BtnExtemporaneo() {
  const { changeEstadoSalidas, getEstadoSalidas } = servicesEstadoSalidas();
  const [estado, setEstado] = useState<{
    label: string;
    color: OverridableStringUnion<
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning",
      ChipPropsColorOverrides
    >;
  }>({
    label: "Desconocido",
    color: "default",
  });

  useEffect(() => {
    getEstadoSalidas().then((response) => {
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

  const handleCambiarEstado = () => {
    changeEstadoSalidas().then((response) => {
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
  };

  return (
    <Paper
      sx={{
        padding: "10px",
        margin: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ mr: "10px" }}>
        Estado de Salidas Extemporáneas
        <Chip sx={{ ml: 1 }} {...estado} variant="outlined" />
      </Typography>
      <Button onClick={() => handleCambiarEstado()}>Cambiar Estado</Button>
    </Paper>
  );
}
