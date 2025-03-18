import TablaTutores from "./components/TablaTutores";
import ModalRegistrarForm from "./components/ModalRegistrarForm";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "@common/hooks/useModal";

export default function AdminTutores() {
  const modal = useModal(false);

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
      <TablaTutores />
      <ModalRegistrarForm modal={modal}/>
    </>
  );
}
