import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ModalStyle } from "@common/styles/ModalStyle";
import { useModal } from "@common/hooks/useModal";
import { useField } from "@common/hooks/useField";

export default function ModalRegistrarForm() {
  const modal = useModal(false);
  const carnet = useField("text", "Carnet", "");
  const nombre = useField("text", "Nombre", "");
  const apellido = useField("text", "Apellido", "");
  const password = useField("password", "Password", "");
  const rfid = useField("password", "RFID", "");

  return (
    <>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={modal.handleOpen}
      >
        Registrar
      </Button>
      <Modal
        open={modal.open}
        onClose={modal.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Registrar Usuario
          </Typography>
          <Box component="form" sx={{ "& .MuiTextField-root": { m: 1 } }}>
            <div style={{ textAlign: "center" }}>
              <TextField required {...carnet} />
              <TextField required {...nombre} />
            </div>
            <div style={{ textAlign: "center" }}>
              <TextField required {...apellido} />
              <TextField required {...password} />
            </div>
            <div style={{ textAlign: "center" }}>
              <TextField required type="number" placeholder="Telefono" />
              <TextField required {...rfid} autoComplete="current-password" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1rem",
              }}
            >
              <Button variant="outlined" color="success" sx={{ maxWidth: "100%" }}>
                Registrar
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
