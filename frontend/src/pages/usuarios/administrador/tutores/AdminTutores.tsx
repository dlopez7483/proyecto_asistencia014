import { Box, Button, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "@common/hooks";
import {
  ModalRegistrarForm,
  TablaHorarioTutor,
  TablaTutores,
} from "./components";
import { useEffect } from "react";
import { getUsuarios } from "./services";
import { useAppSelector, useUsersActions } from "@common/store/hooks";
import ModalRegistrarHorario from "./components/ModalRegistrarHorario";

export default function AdminTutores() {
  const modal = useModal(false);
  const modalRegistrar = useModal(false, {Dia_semana: "Lunes", Hora_entrada: "", Hora_salida: ""});
  const { setTutores } = useUsersActions();
  const { currentTutor } = useAppSelector((state) => state.tutores);

  useEffect(() => {
    getUsuarios().then((res) => {
      if (res.status === 200) {
        setTutores(res.auxiliares);
      } else {
        setTutores([]);
      }
    });
  }, []);

  return (
    <>
      <Container sx={{ margin: "10px" }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={modal.handleOpen}
          sx={{ width: "100%" }}
        >
          Registrar
        </Button>
        <TablaTutores />
      </Container>
      <Container sx={{ margin: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" component="h2">
            Horarios por Tutor
          </Typography>
          {!currentTutor.Carne ? null : (
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={modalRegistrar.handleOpen}
            >
              Registrar Horario
            </Button>
          )}
        </Box>
        <TablaHorarioTutor />
      </Container>
      <ModalRegistrarForm modal={modal} />
      <ModalRegistrarHorario modal={modalRegistrar} />
    </>
  );
}
