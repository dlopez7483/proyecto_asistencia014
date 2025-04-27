const mysql = require("mysql2/promise");
const config = require("../../config/config");
const { verifyToken } = require("../../utils/jwtUtils");

exports.reporte_horas_individual = async (req, res) => {
  try {
    // Obtener token del header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ mensaje: "No autorizado. Token requerido." });
    }

    // Verificar y decodificar el token
    const decoded = verifyToken(token);
    const carne = decoded.carne; // Extraer el carné del token

    // Conectar a la base de datos
    const connection = await mysql.createConnection(config.db);

    // Consulta para obtener los horarios del auxiliar autenticado
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
  where a.Carne = ?
ORDER BY e.Fecha, a.Nombre, a.Apellido;
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
        TIMESTAMPDIFF(SECOND, e.Hora_marcacion, s.Hora_marcacion) AS duracion_segundos
    FROM Auxiliar a
    INNER JOIN Asistencia_Entrada e ON a.Id_auxiliar = e.Id_auxiliar
    INNER JOIN Asistencia_Salida s
        ON a.Id_auxiliar = s.Id_auxiliar
        AND e.Fecha = s.Fecha
        AND e.Id_horario = s.Id_horario
    INNER JOIN Horario h ON h.Id_horario = e.Id_horario
    WHERE a.Carne = ?
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

    const query_horas_diarias = `
        WITH horas_diarias AS (
            SELECT
                a.Id_auxiliar,
                a.Nombre,
                a.Apellido,
                a.carne,
                DATE_FORMAT(e.Fecha, '%Y-%m-%d') AS Fecha,
                SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(s.Hora_marcacion, e.Hora_marcacion)))) AS Horas_completadas
            FROM Auxiliar a
            INNER JOIN Asistencia_Entrada e ON a.Id_auxiliar = e.Id_auxiliar
            INNER JOIN Asistencia_Salida s
                ON a.Id_auxiliar = s.Id_auxiliar
                AND e.Fecha = s.Fecha
                AND e.Id_horario = s.Id_horario
            WHERE a.Carne = ?
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

    // Ejecutar consultas
    const [marcaciones] = await connection.execute(query_marcaciones, [carne]);
    const [horas_acumuladas] = await connection.execute(
      query_horas_acumuladas,
      [carne]
    );
    const [horas_por_fecha] = await connection.execute(query_horas_diarias, [
      carne,
    ]);

    // Cerrar conexión después de obtener los datos
    await connection.end();

    // Enviar respuesta con los datos obtenidos
    res.status(200).json({
      marcaciones,
      horas_por_fecha,
      horas_acumuladas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
