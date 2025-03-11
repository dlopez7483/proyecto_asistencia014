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

export default function TablaTutores() {
  const rows = [
    {
      id: 1,
      nombre: "Prueba1",
      apellido: "lab013",
      carnet: 24523452,
      telefono: 12345678,
    },
    {
      id: 2,
      nombre: "Prueba1",
      apellido: "lab013",
      carnet: 24523452,
      telefono: 12345678,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Carnet</TableCell>
            <TableCell align="right">Telefono</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.nombre}
              </StyledTableCell>
              <StyledTableCell align="right">{row.apellido}</StyledTableCell>
              <StyledTableCell align="right">{row.carnet}</StyledTableCell>
              <StyledTableCell align="right">{row.telefono}</StyledTableCell>
              <StyledTableCell align="center">
                <Button variant="contained">
                  <EditIcon />
                </Button>
                <Button variant="contained" color="error" sx={{ ml: 1 }}>
                  <DeleteIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
