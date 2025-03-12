import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import React from "react";
import loginFunction from "../services/loginFunction";
import { useAuthActions } from "../../../common/store/hooks/useAuthActions";
import Swal from "sweetalert2";

export default function FormLogin() {
  const { setAuthAction } = useAuthActions();
  const [auth, setAuth] = React.useState({
    carne: "",
    contrasenia: "",
    rol: 1,
  });

  const login = async () => {
    const response = await loginFunction(
      auth.carne,
      auth.contrasenia,
      auth.rol
    );

    if (response.status === 200) {
      setAuthAction({
        carne: auth.carne,
        rol: auth.rol,
        token: response.token,
      });

      if (auth.rol === 1) window.location.href = "/dashboard-admin";
      else if (auth.rol === 2) window.location.href = "/dashboard-tutor";
    } else Swal.fire({ icon: "error", title: "Error al Inicio de Sesión", text: response.mensaje });
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
      <TextField
        required
        id="usuario"
        label="Usuario"
        value={auth.carne}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAuth({ ...auth, carne: e.target.value })
        }
      />
      <TextField
        required
        id="password"
        label="Password"
        type="password"
        placeholder="Contraseña"
        autoComplete="current-password"
        sx={{ marginTop: 2 }}
        value={auth.contrasenia}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAuth({ ...auth, contrasenia: e.target.value })
        }
      />
      <FormControl sx={{ marginTop: 2 }}>
        <InputLabel id="selectRol">Rol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="select"
          label="Rol"
          value={String(auth.rol)}
          onChange={(e: SelectChangeEvent) =>
            setAuth({ ...auth, rol: Number(e.target.value) })
          }
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
