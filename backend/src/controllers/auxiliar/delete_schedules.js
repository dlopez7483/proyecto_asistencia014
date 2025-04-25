const mysql = require("mysql2/promise");
const config = require("../../config/config");
const { verificarEstadoPeriodoHorarios } = require('../status_schedules');
const { verifyToken } = require('../../utils/jwtUtils'); // Importar función para verificar el token

exports.delete_horario = async (req, res) => {
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
    const params = req.params;

    // Conectar a la base de datos
    const connection = await mysql.createConnection(config.db);

    // Verificamos si el periodo para agregar horarios está activado
    const estadoPeriodo = await verificarEstadoPeriodoHorarios();
    if (estadoPeriodo === 0) {
      return res
        .status(400)
        .json({
          mensaje:
            "El periodo de horarios está cerrado. No se pueden agregar horarios.",
        });
    } else if (estadoPeriodo === null) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró configuración en la base de datos." });
    }


    // Eliminar relaciones en auxiliar_horario
    const delete_auxiliar_horario = `DELETE FROM Auxiliar_Horario WHERE Id_horario = ?;`;
    await connection.execute(delete_auxiliar_horario, [params.Id_horario]);

    // Cerrar conexión
    await connection.end();

    res.status(200).json({ mensaje: "Horario eliminado" });
  } catch (error) {
    console.error("Error al eliminar el horario:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
