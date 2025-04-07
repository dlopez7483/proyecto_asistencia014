import React, { useEffect, useState } from 'react';
import { getReporteHorasIndividual } from './services/serviceHorario'; // Asegúrate de que esta sea la ruta correcta
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';

const HorariosAuxiliar = () => {
  const [horariosData, setHorariosData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const data = await getReporteHorasIndividual();
        if (data.status === 200) {
          setHorariosData(data);
        } else {
          setError(data.mensaje || 'Error al obtener los horarios');
        }
      } catch (err) {
        setError('Hubo un error en la conexión');
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dia de la Semana</TableCell>
            <TableCell>Hora de Entrada</TableCell>
            <TableCell>Hora de Salida</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {horariosData?.horarios?.map((horario: any) => (
            <TableRow key={horario.Id_horario}>
              <TableCell>{horario.Dia_semana}</TableCell>
              <TableCell>{horario.Hora_entrada}</TableCell>
              <TableCell>{horario.Hora_salida}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HorariosAuxiliar;
