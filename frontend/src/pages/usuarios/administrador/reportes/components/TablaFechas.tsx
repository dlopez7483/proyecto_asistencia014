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
  
  export default function TablaFechas({
    horasFechas,
  }: {
    horasFechas: any;
  }) {
    const columns = [
      "Nombre",
      "Apellido",
      "Fecha",
      "Horas Completadas",
      "Total Acumuladas",
    ];
  
    return (
      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6" gutterBottom component="div">
          Horas por Fecha
        </Typography>
        <TableContainer component={Paper} sx={{ height: 400 }}>
          <Table aria-label="horas faltantes">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column} align="left">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {horasFechas.map((row: any) => (
                <StyledTableRow
                  key={row}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.Nombre}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Apellido}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.carne}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Fecha}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Horas_completadas}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Total_horas_acumuladas}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  