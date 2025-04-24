/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getHorariosTutor } from "../services/getHorariosTutor";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
//import { useModal } from "@common/hooks";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "@common/components/StyledTable";
import { useAppSelector } from "@common/store/hooks";
import { deleteSchedule } from "../services";
import ModalUpdateHora from "./ModalUpdateHora";
import { useModal } from "@common/hooks";
import Swal from "sweetalert2";

const columns: Array<string> = ["Día", "Hora de Entrada", "Hora de Salida"];

export default function TablaHorarioTutor() {
  const { currentTutor } = useAppSelector((state) => state.tutores);
  const [userData, setUserData] = useState({
    rows: Array<any>(),
  });
  const modal = useModal(false, {});

  useEffect(() => {
    if (!currentTutor.Carne) return;
    getHorariosTutor(currentTutor.Carne).then((res) => {
      if (res.status === 200) {
        setUserData({
          rows: res.horarios,
        });
      } else {
        setUserData({
          rows: [],
        });
      }
    });
  }, [currentTutor]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSchedule(id).then((res) => {
          if (res.status === 200) {
            setUserData((prevState) => ({
              ...prevState,
              rows: prevState.rows.filter((row) => row.Id_horario !== id),
            }));
          } else {
            console.log("Error deleting schedule:", res);
          }
        });
      }
    });
  };

  return (
    <>
      <Box>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 400, width: "100%" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={columns.indexOf(column)} align="left">
                    {column}
                  </TableCell>
                ))}
                <TableCell key="Acciones" align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.rows.map((row: any) => (
                <StyledTableRow key={userData.rows.indexOf(row)}>
                  <StyledTableCell align="left">
                    {row.Dia_semana}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Hora_entrada}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Hora_salida}
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
                          modal.handleOpen();
                          modal.setData(row);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleDelete(row.Id_horario);
                        }}
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
      </Box>
      <ModalUpdateHora modal={modal} setUserData={setUserData} />
    </>
  );
}
