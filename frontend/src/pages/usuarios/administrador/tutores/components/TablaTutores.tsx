import {
  Button,
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
import { useEffect, useState } from "react";
import { getUsuarios } from "../services";
import { useUsersActions } from "@common/store/hooks";
import ModalUpdateForm from "./ModalUpdateForm";
import { useModal } from "@common/hooks";
import Swal from "sweetalert2";
import { User } from "@common/interfaces/User";

export default function TablaTutores() {
  const [tutor, setTutor] = useState({});
  const modalUpdate = useModal(false);
  const { tutores } = useAppSelector((state) => state.tutores);
  const { setTutores, deleteTutor } = useUsersActions();

  useEffect(() => {
    getUsuarios().then((res) => {
      if (res.status === 200) {
        setTutores(res.auxiliares);
      } else {
        setTutores([]);
        console.log(res);
      }
    });
  }, []);

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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Carnet</TableCell>
              <TableCell align="right">Telefono</TableCell>
              <TableCell align="right">RFID</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tutores.length > 0
              ? tutores.map((row) => (
                  <StyledTableRow
                    key={row.Id_auxiliar}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.Nombre}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Apellido}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Carne}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Telefono}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Codigo_RFID}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setTutor(row);
                          modalUpdate.handleOpen();
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button variant="contained" color="error" sx={{ ml: 1 }} onClick={() => clickDeleteTutor(row)}>
                        <DeleteIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalUpdateForm tutor={tutor} modal={modalUpdate} />
    </>
  );
}
