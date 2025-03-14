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
import { useAppSelector } from "@common/store/hooks/useStoreHooks";

export default function TablaTutores() {
  const tutores  = useAppSelector((state) => state.users.tutores);

  return (
    <TableContainer component={Paper} sx={{mt:2}}>
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
          {tutores.map((row) => (
            <StyledTableRow
              key={row.id_usuario}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.nombre}
              </StyledTableCell>
              <StyledTableCell align="right">{row.apellido}</StyledTableCell>
              <StyledTableCell align="right">{row.carne}</StyledTableCell>
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
