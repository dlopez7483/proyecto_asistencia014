/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { getHorasFaltantes } from "../services";
import {
  StyledTableCell,
  StyledTableRow,
} from "@common/components/StyledTable";

export default function ReporteHorasFaltantes() {
  const [rows, setRows] = useState([]);
  const [currentTutor, setCurrentTutor] = useState<any>({});
  const columns: Array<string> = [
    "Nombre",
    "Horas Trabajadas",
    "Horas Faltantes",
  ];

  useEffect(() => {
    getHorasFaltantes().then((res) => {
      if (res.status === 200) {
        setRows(res.reporte);
      } else {
        console.log("Error fetching data:", res);
      }
    });
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Reporte de Horas Faltantes
      </Typography>
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <TableContainer component={Paper} sx={{ height: 200 }}>
            <Table aria-label="horas faltantes">
              <TableHead>
                <TableRow>
                  <TableCell key="select"></TableCell>
                  {columns.map((column) => (
                    <TableCell key={column} align="left">
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <StyledTableRow
                    key={row.Id_auxiliar}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => {
                      setCurrentTutor(row);
                    }}
                  >
                    <StyledTableCell component="th" scope="row">
                      <input
                        type="checkbox"
                        id={row.Id_auxiliar}
                        checked={currentTutor.Id_auxiliar === row.Id_auxiliar}
                        readOnly
                      />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.Nombre}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.horas_trabajadas}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.horas_faltantes}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          {currentTutor.Id_auxiliar ? (
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: currentTutor.horas_trabajadas,
                      label: "Horas Trabajadas",
                    },
                    {
                      id: 1,
                      value: currentTutor.horas_faltantes,
                      label: "Horas Faltantes",
                    },
                  ],
                },
              ]}
              height={200}
            />
          ) : null}
        </Grid2>
      </Grid2>
    </div>
  );
}
