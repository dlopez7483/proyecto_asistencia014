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
  Fecha: string;
  Nombre: string;
  Apellido: string;
  Hora_entrada: string;
  Hora_salida: string;
  Id_horario: number;
}

interface HorasPorFecha {
  Fecha: string;
  Nombre: string;
  Apellido: string;
  Horas_completadas: string;
  Total_horas_acumuladas: string;
}

interface TotalAcumulado {
  Nombre: string;
  Apellido: string;
  Horas_acumuladas: string;
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
        console.log(response.horas_por_fecha);
        setTotalAcumulado(response.horas_acumuladas || []);
        console.log(response.horas_acumuladas);
      } else {
        console.error("Error al obtener el reporte:", response);
      }
    };

    fetchReporte();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
              </TableRow>
            </TableHead>
            <TableBody>
              {marcaciones.map((m, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(m.Fecha)}</TableCell>
                  <TableCell>{m.Nombre}</TableCell>
                  <TableCell>{m.Apellido}</TableCell>
                  <TableCell>{formatTime(m.Hora_entrada)}</TableCell>
                  <TableCell>{formatTime(m.Hora_salida)}</TableCell>
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
                  <TableCell>{formatDate(h.Fecha)}</TableCell>
                  <TableCell>{h.Nombre}</TableCell>
                  <TableCell>{h.Apellido}</TableCell>
                  <TableCell>{h.Horas_completadas}</TableCell>
                  <TableCell>{h.Total_horas_acumuladas}</TableCell>
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
                  <TableCell>{t.Nombre}</TableCell>
                  <TableCell>{t.Apellido}</TableCell>
                  <TableCell>{t.Horas_acumuladas}</TableCell>
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
