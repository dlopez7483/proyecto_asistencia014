const { verificarEstadoSalidasExtemporaneas } = require("../status_salidas");
const mysqlPool = require('../../config/conexion');

// Función para habilitar el periodo de horarios
exports.cambiarEstadoSalidas = async (req, res) => {
  try {
    const estadoSalidasExtemporaneas = await verificarEstadoSalidasExtemporaneas();

    // Suponiendo que tenemos una tabla de configuración para habilitar/inhabilitar el período de horarios
    const query = `
            UPDATE Configuracion
            SET Periodo_horarios = ?
            WHERE Id_configuracion = 2;
        `;

    // Ejecutar la consulta
    await mysqlPool.execute(query, [estadoSalidasExtemporaneas == 1 ? 0 : 1]);

    // Responder con un mensaje de éxito
    res
      .status(200)
      .json({ estado: estadoSalidasExtemporaneas == 1 ? "deshabilitado" : "habilitado" });
  } catch (error) {
    console.error("Error al cambiar el estado de las salidas extemporaneas:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
