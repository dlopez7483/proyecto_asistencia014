import { Button, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "@common/hooks";
import {
  ModalRegistrarForm,
  TablaHorarioTutor,
  TablaTutores,
} from "./components";
import { useEffect } from "react";
import { getUsuarios } from "./services";
import { useUsersActions } from "@common/store/hooks";

export default function AdminTutores() {
  const modal = useModal(false);
  const { setTutores } = useUsersActions();

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
      <Paper sx={{ padding: "10px", margin: "10px" }}>
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
      </Paper>
      <Paper sx={{ padding: "10px", margin: "10px" }}>
        <Typography variant="h5" component="h2">
          Horarios por Tutor
        </Typography>
        <TablaHorarioTutor />
      </Paper>
      <ModalRegistrarForm modal={modal} />
    </>
  );
}
