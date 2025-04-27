const mysql = require("mysql2/promise");
const config = require("../../config/config");

exports.set_hours = async (req, res) => {
  try {
    const connection = await mysql.createConnection(config.db);
    const { id_tutor, fecha, hora_entrada, hora_salida} = req.body;

    if (!id_tutor || !fecha || !hora_entrada || !hora_salida) {
      return res
        .status(400)
        .json({ mensaje: "Todos los campos son obligatorios" });
    }
    // Insertar nuevo horario
    const InsertarHorarioExtraQuery = `
                call registrarHorarioExtra(?, ?, ?, ?);
            `;

    await connection.execute(InsertarHorarioExtraQuery, [
      id_tutor,
      fecha,
      hora_entrada,
      hora_salida,
    ]);

    res.status(200).json({ mensaje: "Horas Registradas Exitosamente" });
  } catch (error) {
    console.error("Error al ingresar horas:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
// Cerrar el pool de conexiones si es necesario
