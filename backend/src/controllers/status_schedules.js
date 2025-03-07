const mysql = require('mysql2/promise');
const config = require('../config/config');

// 🔹 Función de utilidad que obtiene el estado del período de horarios
exports.verificarEstadoPeriodoHorarios = async () => {
    try {
        const connection = await mysql.createConnection(config.db);
        const query = `SELECT Periodo_horarios FROM Configuracion WHERE Id_configuracion = 1;`;
        const [rows] = await connection.execute(query);
        await connection.end();

        // Retornar el estado (1 o 0) si se encontró un resultado válido
        return rows.length > 0 ? rows[0].Periodo_horarios : null;
    } catch (error) {
        console.error('Error al verificar el estado del periodo de horarios:', error);
        throw error; // Lanzamos el error para manejarlo en otro lugar
    }
};

// 🔹 Controlador que usa la función y responde a la API
exports.obtenerEstadoPeriodoHorarios = async (req, res) => {
    try {
        const estado = await exports.verificarEstadoPeriodoHorarios();

        if (estado === null) {
            return res.status(404).json({ mensaje: 'No se encontró configuración' });
        }

        res.status(200).json({ estado: estado === 1 ? 'habilitado' : 'deshabilitado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
