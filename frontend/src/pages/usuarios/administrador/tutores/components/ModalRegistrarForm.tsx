import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Grid2,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80vw",
  maxHeight: "80vh",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  state: boolean;
  setStateModal: (state: boolean) => void;
}

export default React.memo(function ModalRegistrarForm(props: Props) {
  const handleClose = () => props.setStateModal(false);

  return (
    <Modal
      open={props.state}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Registrar Usuario
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <Grid2 container spacing={2} sx={{ p: 1 }}>
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <TextField required id="carne" label="Carne" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <TextField required id="nombre" label="Nombre" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <TextField required id="apellido" label="Apellido" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <TextField required id="telefono" label="Telefono" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              {" "}
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}></Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}></Grid2>
          </Grid2>
        </Box>
      </Box>
    </Modal>
  );
});
