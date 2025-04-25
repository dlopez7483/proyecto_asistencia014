import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StyledTableCell,
  StyledTableRow,
} from "@common/components/StyledTable";
import { useAppSelector } from "@common/store/hooks";
import { useUsersActions } from "@common/store/hooks";
import ModalUpdateForm from "./ModalUpdateForm";
import { useModal } from "@common/hooks";
import Swal from "sweetalert2";
import { User } from "@common/interfaces/User";

export default function TablaTutores() {
  const modalUpdate = useModal(false, {});
  const { tutores, currentTutor } = useAppSelector((state) => state.tutores);
  const { deleteTutor, setCurrentUser } = useUsersActions();

  const clickDeleteTutor = (user: User) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar este tutor?",
      text: "No podras revertir esta accion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTutor(user);
      }
    });
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Carnet</TableCell>
              <TableCell align="right">Telefono</TableCell>
              <TableCell align="right">RFID</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tutores.map((row) => (
              <StyledTableRow
                key={tutores.indexOf(row)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  setCurrentUser(row);
                }}
              >
                <StyledTableCell component="th" scope="row">
                  <Checkbox
                    checked={currentTutor.Id_auxiliar == row.Id_auxiliar}
                  ></Checkbox>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.Nombre}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Apellido}</StyledTableCell>
                <StyledTableCell align="right">{row.Carne}</StyledTableCell>
                <StyledTableCell align="right">{row.Telefono}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.Codigo_RFID}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        modalUpdate.handleOpen();
                        modalUpdate.setData(row);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => clickDeleteTutor(row)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalUpdateForm modal={modalUpdate} />
    </>
  );
}
