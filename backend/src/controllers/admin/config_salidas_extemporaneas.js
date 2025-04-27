const { verificarEstadoSalidasExtemporaneas } = require("../status_salidas");
const mysql = require("mysql2/promise"); // Cambiamos a mysql2/promise
const config = require("../../config/config");

// Función para habilitar el periodo de horarios
exports.cambiarEstadoSalidas = async (req, res) => {
  try {
    // Conexión a la base de datos
    const connection = await mysql.createConnection(config.db);

    const estadoSalidasExtemporaneas = await verificarEstadoSalidasExtemporaneas();

    // Suponiendo que tenemos una tabla de configuración para habilitar/inhabilitar el período de horarios
    const query = `
            UPDATE Configuracion
            SET Periodo_horarios = ?
            WHERE Id_configuracion = 2;
        `;

    // Ejecutar la consulta
    await connection.execute(query, [estadoSalidasExtemporaneas == 1 ? 0 : 1]);

    // Cerrar la conexión
    await connection.end();

    // Responder con un mensaje de éxito
    res
      .status(200)
      .json({ estado: estadoSalidasExtemporaneas == 1 ? "deshabilitado" : "habilitado" });
  } catch (error) {
    console.error("Error al cambiar el estado de las salidas extemporaneas:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
