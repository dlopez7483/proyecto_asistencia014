/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  StyledTableCell,
  StyledTableRow,
} from "@common/components/StyledTable";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatDate } from "../utils/formatDate";



export default function TablaMarcaciones({
  marcaciones,
}: {
  marcaciones: any;
}) {
  const columns = [
    "Nombre",
    "Apellido",
    "Fecha",
    "Hora Entrada",
    "Hora Salida",
  ];

  return (
    <div>
      <Typography variant="h6" gutterBottom component="div">
        Marcaciones
      </Typography>
      <TableContainer component={Paper} sx={{ height: 400 }}>
        <Table aria-label="horas faltantes">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={columns.indexOf(column)} align="left">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {marcaciones.map((row: any) => (
              <StyledTableRow
                key={marcaciones.indexOf(row)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.Nombre}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.Apellido}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {formatDate(row.Fecha).split(", ")[0]}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {formatDate(row.Hora_entrada).split(", ")[1]}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {formatDate(row.Hora_salida).split(", ")[1]}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
