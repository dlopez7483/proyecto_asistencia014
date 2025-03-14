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
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";


export default function FormLogin() {
  const usuario = useField("text", "usuario","" );
  const password = useField("password", "password","" );
  const selectRol = useSelect("rol","1" );
  const { login } = useAuth(usuario.value, password.value, parseInt(selectRol.value));

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
      <TextField
        required
        {...usuario}
      />
      <TextField
        required
        placeholder="Contraseña"
        autoComplete="current-password"
        sx={{ marginTop: 2 }}
        {...password}
      />
      <FormControl sx={{ marginTop: 2 }}>
        <InputLabel id="selectRol">Rol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          {...selectRol}
        >
          <MenuItem value={1}>Administrador</MenuItem>
          <MenuItem value={2}>Tutor</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ marginTop: 2 }} onClick={login}>
        Iniciar Sesión
      </Button>
    </Container>
  );
}
