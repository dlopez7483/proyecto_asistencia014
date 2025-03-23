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
//import { useModal } from "@common/hooks";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "@common/components/StyledTable";
import { useAppSelector } from "@common/store/hooks";

const columns: Array<string> = [
  "ID",
  "Día",
  "Hora de Entrada",
  "Hora de Salida",
];

export default function TablaHorarioTutor() {
  const { currentTutor } = useAppSelector((state) => state.tutores);
  const [userData, setUserData] = useState({
    user: "",
    rows: Array<any>(),
  });
  //const { modalOpen, handleOpen, handleClose } = useModal(false);

  useEffect(() => {
    if (!currentTutor.Carne) return;
    getHorariosTutor(currentTutor.Carne).then((res) => {
      if (res.status === 200) {
        setUserData({
          user: `${res.carne} - ${res.nombre}`,
          rows: res.horarios,
        });
      } else {
        setUserData({
          user: "",
          rows: [],
        });
      }
    });
  }, [currentTutor]);

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
                  <TableCell key={column} align="left">
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
                <StyledTableRow key={row.Id_horario}>
                  <StyledTableCell align="left">
                    {row.Id_horario}
                  </StyledTableCell>
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
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          //handleOpen();
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
