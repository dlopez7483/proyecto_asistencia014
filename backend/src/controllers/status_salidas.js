const mysqlPool = require('../config/conexion');

// 🔹 Función de utilidad que obtiene el estado de las salidas extemporaneas
exports.verificarEstadoSalidasExtemporaneas = async () => {
    try {
      const query = `SELECT Periodo_horarios FROM Configuracion WHERE Id_configuracion = 2;`;
      const [rows] = await mysqlPool.execute(query);

      // Retornar el estado (1 o 0) si se encontró un resultado válido
      return rows.length > 0 ? rows[0].Periodo_horarios : null;
    } catch (error) {
      console.error(
        "Error al verificar el estado del periodo de horarios:",
        error
      );
      throw error; // Lanzamos el error para manejarlo en otro lugar
    }
  };

  // 🔹 Controlador que usa la función y responde a la API
exports.obtenerEstadoSalidas = async (req, res) => {
  try {
      const estado = await exports.verificarEstadoSalidasExtemporaneas();

      if (estado === null) {
          return res.status(404).json({ mensaje: 'No se encontró configuración' });
      }

      res.status(200).json({ estado: estado === 1 ? 'habilitado' : 'deshabilitado' });
  } catch (error) {
      console.log(error)
      res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};