const mysql = require('mysql2/promise');
const config = require('../../config/config');
const { query } = require('express');

exports.reporte_global_horas = async (req, res) => {
    try {
        const connection = await mysql.createConnection(config.db);
        const query_marcaciones = `
SELECT
  a.Id_auxiliar,
  a.Nombre,
  a.Apellido,
  e.Fecha,
  e.Hora_marcacion AS Hora_entrada,
  s.Hora_marcacion AS Hora_salida,
  e.Id_horario,
  s.Id_horario
FROM Auxiliar a
INNER JOIN Asistencia_Entrada e
  ON a.Id_auxiliar = e.Id_auxiliar
INNER JOIN Asistencia_Salida s
  ON a.Id_auxiliar = s.Id_auxiliar
  AND e.Fecha = s.Fecha AND e.Id_horario = s.Id_horario
ORDER BY e.Fecha, a.Nombre, a.Apellido;

        `;

query_horas_diarias = `
WITH horas_diarias AS (
  SELECT
    a.Id_auxiliar,
    a.Nombre,
    a.Apellido,
    a.carne,
    DATE_FORMAT(e.Fecha, '%Y-%m-%d') AS Fecha,  -- Formato adecuado de fecha
    SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(s.Hora_marcacion, e.Hora_marcacion)))) AS Horas_completadas
  FROM Auxiliar a
  INNER JOIN Asistencia_Entrada e ON a.Id_auxiliar = e.Id_auxiliar
  INNER JOIN Asistencia_Salida s
    ON a.Id_auxiliar = s.Id_auxiliar
    AND e.Fecha = s.Fecha
    AND e.Id_horario = s.Id_horario
  GROUP BY a.Id_auxiliar, a.Nombre, a.Apellido, e.Fecha
)
SELECT
  h.Id_auxiliar,
  h.Nombre,
  h.Apellido,
  h.Fecha,
  h.Horas_completadas,
  SEC_TO_TIME(SUM(TIME_TO_SEC(h.Horas_completadas)) OVER (PARTITION BY h.Id_auxiliar)) AS Total_horas_acumuladas
FROM horas_diarias h
ORDER BY h.Id_auxiliar, h.Fecha;


`;

query_horas_acumuladas = `
WITH horas_marcacion AS (
  -- 1. Obtiene las horas de entrada y salida organizadas por auxiliar
  SELECT
    a.Id_auxiliar,
    a.Nombre,
    a.Apellido,
    a.carne,
    DATE_FORMAT(e.Fecha, '%Y-%m-%d') AS Fecha,
    e.Hora_marcacion AS Hora_entrada,
    s.Hora_marcacion AS Hora_salida
  FROM Auxiliar a
  INNER JOIN Asistencia_Entrada e ON a.Id_auxiliar = e.Id_auxiliar
  INNER JOIN Asistencia_Salida s
    ON a.Id_auxiliar = s.Id_auxiliar
    AND e.Fecha = s.Fecha
    AND e.Id_horario = s.Id_horario
),
horas_completadas AS (
  -- 2. Calcula las horas completadas solo si hay entrada y salida
  SELECT
    hm.Id_auxiliar,
    hm.Nombre,
    hm.Apellido,
    SUM(TIME_TO_SEC(TIMEDIFF(hm.Hora_salida, hm.Hora_entrada))) AS Total_horas_segundos
  FROM horas_marcacion hm
  GROUP BY hm.Id_auxiliar, hm.Nombre, hm.Apellido
)
-- 3. Convierte segundos a formato HH:MM:SS y ordena correctamente
SELECT
  hc.Id_auxiliar,
  hc.Nombre,
  hc.Apellido,
  TIME_FORMAT(SEC_TO_TIME(hc.Total_horas_segundos), '%H:%i:%s') AS Horas_acumuladas
FROM horas_completadas hc
ORDER BY hc.Total_horas_segundos DESC;

`;



        const [filas] = await connection.execute(query_marcaciones);
        const [filas2] = await connection.execute(query_horas_diarias);
        const [filas3] = await connection.execute(query_horas_acumuladas);
        await connection.end();
        res.status(200).json({
            marcaciones: filas , horas_por_fecha: filas2, horas_acumuladas: filas3
        });
    } catch (error) {
        console.error('Error al obtener el reporte:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }

}