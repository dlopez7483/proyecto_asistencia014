import "./Login.css";

import {
  Container,
  Grid2,
} from "@mui/material";
import Item from "@common/components/Item";
import { OutherTheme } from "@common/styles/OutherTheme";
import { AppProvider } from "@toolpad/core";


import FormLogin from "./components/FormLogin";

function Login() {

  return (
    <AppProvider theme={OutherTheme}>
      <Grid2 container sx={{ padding: "1rem", height: "100%" }} spacing={1}>
        <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 3 }} sx={{ height: "100%" }}>
          <Item
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container sx={{ marginBottom: "auto", maxHeight: "20%" }}>
              <img
                id="logo-dtt"
                src="/src/assets/logo-ecys-fiusac-min.png"
                alt="Usac"
              />
            </Container>
            <FormLogin />
          </Item>
        </Grid2>
        <Grid2 size={{ xs: 0, sm: 0, md: 8, lg: 9 }} sx={{ height: "100%" }}>
          <img
            id="foto-usac"
            src="/src/assets/fiusac01.jpg"
            alt="Usac Ingenieria"
          />
        </Grid2>
      </Grid2>
    </AppProvider>
  );
}

export default Login;
