const mysqlPool = require('../../config/conexion');

exports.reporte_global_horas = async (req, res) => {
    try {
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
  AND e.Fecha = s.Fecha 
  AND e.Id_horario = s.Id_horario
ORDER BY e.Fecha, a.Nombre, a.Apellido;
        `;

const query_horas_diarias = `
WITH horas_diarias AS (
  SELECT DISTINCT
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

const query_horas_acumuladas = `
WITH asistencias_completas AS (
  SELECT
    a.Id_auxiliar,
    a.Nombre,
    a.Apellido,
    h.Id_horario,
    h.Hora_entrada,
    h.Hora_salida,
    TIMESTAMPDIFF(SECOND, h.Hora_entrada, h.Hora_salida) AS duracion_segundos
  FROM Auxiliar a
  INNER JOIN Asistencia_Entrada e ON a.Id_auxiliar = e.Id_auxiliar
  INNER JOIN Asistencia_Salida s 
    ON a.Id_auxiliar = s.Id_auxiliar 
    AND e.Fecha = s.Fecha 
    AND e.Id_horario = s.Id_horario
  LEFT JOIN Horario h ON h.Id_horario = e.Id_horario
),
horas_completadas AS (
  SELECT
    ac.Id_auxiliar,
    ac.Nombre,
    ac.Apellido,
    SUM(ac.duracion_segundos) AS Total_horas_segundos
  FROM asistencias_completas ac
  GROUP BY ac.Id_auxiliar, ac.Nombre, ac.Apellido
)
SELECT
  hc.Id_auxiliar,
  hc.Nombre,
  hc.Apellido,
  TIME_FORMAT(SEC_TO_TIME(hc.Total_horas_segundos), '%H:%i:%s') AS Horas_acumuladas
FROM horas_completadas hc
ORDER BY hc.Total_horas_segundos DESC;
`;



        const [filas] = await mysqlPool.execute(query_marcaciones);
        const [filas2] = await mysqlPool.execute(query_horas_diarias);
        const [filas3] = await mysqlPool.execute(query_horas_acumuladas);
        res.status(200).json({
            marcaciones: filas , horas_por_fecha: filas2, horas_acumuladas: filas3
        });
    } catch (error) {
        console.error('Error al obtener el reporte:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }

}