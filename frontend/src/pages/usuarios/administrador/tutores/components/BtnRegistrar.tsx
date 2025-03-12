import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  setStateModal: (state: boolean) => void;
}

export default function BtnRegistrar(props: Props) {
  const handleOpen = () => props.setStateModal(true);

  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<AddIcon />}
      onClick={handleOpen}
    >
      Registrar
    </Button>
  );
}
