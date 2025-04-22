import { useField } from "@common/hooks/useField";
import { useSelect } from "@common/hooks/useSelect";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export default function FormLogin() {
  const usuario = useField("text", "usuario", "");
  const password = useField("password", "password", "");
  const selectRol = useSelect("rol", "1");

  const { login } = useAuth(
    usuario.props.value,
    password.props.value,
    parseInt(selectRol.value)
  );

  // Estado del modal
  const [open, setOpen] = useState(false);
  const [rfid, setRfid] = useState("");

  const handleMarcarAsistencia = async (tipo: string) => {
    if (!rfid) return;

    try {
      const endpoint =
        tipo === "entrada"
          ? "http://localhost:5000/auth/marcar_entrada"
          : "http://localhost:5000/auth/marcar_salida";

      const response = await axios.post(endpoint, { rfid });
      alert(response.data.mensaje || "Asistencia marcada correctamente");
    } catch (error:any) {
      alert(error.response?.data?.mensaje || "Error al marcar asistencia");
    }

    setOpen(false);
    setRfid("");
  };

  return (
    <Container
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          typography: "body1",
          marginBottom: "1rem",
          color: "text.primary",
        }}
      >
        INICIO DE SESIÓN
      </Box>
      <TextField required {...usuario.props} />
      <TextField
        required
        placeholder="Contraseña"
        autoComplete="current-password"
        sx={{ marginTop: 2 }}
        {...password.props}
      />
      <FormControl sx={{ marginTop: 2 }}>
        <InputLabel id="selectRol">Rol</InputLabel>
        <Select labelId="demo-simple-select-label" {...selectRol}>
          <MenuItem value={1}>Administrador</MenuItem>
          <MenuItem value={2}>Tutor</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ marginTop: 2 }} onClick={login}>
        Iniciar Sesión
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 2 }}
        onClick={() => setOpen(true)}
      >
        Marcar Asistencia
      </Button>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Marcar Asistencia</DialogTitle>
        <DialogContent>
          <TextField
            label="Código RFID"
            fullWidth
            value={rfid}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setRfid(e.target.value)}
            sx={{ marginBottom: 2, marginTop: 1 }}
          />
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Selecciona una opción:
          </Typography>
          <Box display="flex" justifyContent="space-between" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleMarcarAsistencia("entrada")}
              disabled={!rfid}
              fullWidth
            >
              Marcar Entrada
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleMarcarAsistencia("salida")}
              disabled={!rfid}
              fullWidth
            >
              Marcar Salida
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
