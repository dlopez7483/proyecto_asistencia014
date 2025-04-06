import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getReporteHorasIndividual } from "./services/reporteService";

interface Marcacion {
  fecha: string;
  nombre: string;
  apellido: string;
  hora_entrada: string;
  hora_salida: string;
  horario: string;
}

interface HorasPorFecha {
  fecha: string;
  nombre: string;
  apellido: string;
  horas_completadas: number;
  total_acumulado: number;
}

interface TotalAcumulado {
  nombre: string;
  apellido: string;
  horas_acumuladas: number;
}

const ReporteIndividual: React.FC = () => {
  const [marcaciones, setMarcaciones] = useState<Marcacion[]>([]);
  const [horasPorFecha, setHorasPorFecha] = useState<HorasPorFecha[]>([]);
  const [totalAcumulado, setTotalAcumulado] = useState<TotalAcumulado[]>([]);

  useEffect(() => {
    const fetchReporte = async () => {
      const response = await getReporteHorasIndividual();

      if (response.status === 200) {
        setMarcaciones(response.marcaciones || []);
        console.log(response.marcaciones);
        setHorasPorFecha(response.horas_por_fecha || []);
        setTotalAcumulado(response.total_acumulado || []);
      } else {
        console.error("Error al obtener el reporte:", response);
      }
    };

    fetchReporte();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Reporte Individual de Horas
      </Typography>

      {/* Marcaciones */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Marcaciones
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Hora Entrada</TableCell>
                <TableCell>Hora Salida</TableCell>
                <TableCell>Horario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marcaciones.map((m, index) => (
                <TableRow key={index}>
                  <TableCell>{m.fecha}</TableCell>
                  <TableCell>{m.nombre}</TableCell>
                  <TableCell>{m.apellido}</TableCell>
                  <TableCell>{m.hora_entrada}</TableCell>
                  <TableCell>{m.hora_salida}</TableCell>
                  <TableCell>{m.horario}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Horas por fecha */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Horas Completadas por Fecha
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Horas Completadas</TableCell>
                <TableCell>Total Acumulado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {horasPorFecha.map((h, index) => (
                <TableRow key={index}>
                  <TableCell>{h.fecha}</TableCell>
                  <TableCell>{h.nombre}</TableCell>
                  <TableCell>{h.apellido}</TableCell>
                  <TableCell>{h.horas_completadas}</TableCell>
                  <TableCell>{h.total_acumulado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Total acumulado */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Total de Horas Acumuladas
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Horas Acumuladas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalAcumulado.map((t, index) => (
                <TableRow key={index}>
                  <TableCell>{t.nombre}</TableCell>
                  <TableCell>{t.apellido}</TableCell>
                  <TableCell>{t.horas_acumuladas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReporteIndividual;
