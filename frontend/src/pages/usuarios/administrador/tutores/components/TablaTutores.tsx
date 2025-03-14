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
import { useTutores } from "../hooks/useTutores";
import { useAppSelector } from "@common/store/hooks/useStoreHooks";

export default function TablaTutores() {
  const { getTutores } = useTutores();
  const { tutores } = useAppSelector((state) => state.users);
  getTutores();

  return (
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
                    <Button variant="contained">
                      <EditIcon />
                    </Button>
                    <Button variant="contained" color="error" sx={{ ml: 1 }}>
                      <DeleteIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
