const mysql = require('mysql2/promise'); // Cambiamos a mysql2/promise
const config = require('../config/config');

exports.verificarEstadoPeriodoHorarios = async (req, res) => {
    try {
        // Conexión a la base de datos usando la versión de promesas
        const connection = await mysql.createConnection(config.db);
        // Consulta para obtener el estado actual del período de horarios
        const query = `SELECT Periodo_horarios FROM Configuracion WHERE Id_configuracion = 1;`;
        // Ejecutar la consulta
        const [rows] = await connection.execute(query);
        // Cerrar la conexión
        await connection.end();
        // Verificar si se obtuvo un resultado válido
        if (rows.length > 0) {
            const estado = rows[0].Periodo_horarios;
            res.status(200).json({ estado: estado === 1 ? 'habilitado' : 'deshabilitado' });
        } else {
            res.status(404).json({ mensaje: 'No se encontró configuración' });
        }
    } catch (error) {
        console.error('Error al verificar el estado del periodo de horarios:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};