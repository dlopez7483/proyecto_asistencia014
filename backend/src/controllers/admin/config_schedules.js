const mysqlPool = require('../../config/conexion');

// Función para habilitar el periodo de horarios
exports.habilitarPeriodoHorarios = async (req, res) => {
    try {
        // Suponiendo que tenemos una tabla de configuración para habilitar/inhabilitar el período de horarios
        const query = `
            UPDATE Configuracion
            SET Periodo_horarios = 1  -- '1' indica que el período de horarios está habilitado
            WHERE Id_configuracion = 1;
        `;

        // Ejecutar la consulta
        await mysqlPool.execute(query);

        // Responder con un mensaje de éxito
        res.status(200).json({ mensaje: 'El período de horarios ha sido habilitado' });
    } catch (error) {
        console.error('Error al habilitar el periodo de horarios:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};


exports.deshabilitarPeriodoHorarios = async (req, res) => {
    try {
        // Consulta para deshabilitar el período
        const query = `
            UPDATE Configuracion
            SET Periodo_horarios = 0  -- '0' indica que el período de horarios está deshabilitado
            WHERE Id_configuracion = 1;
        `;

        // Ejecutar la consulta
        await mysqlPool.execute(query);

        // Responder con un mensaje de éxito
        res.status(200).json({ mensaje: 'El período de horarios ha sido deshabilitado' });
    } catch (error) {
        console.error('Error al deshabilitar el periodo de horarios:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};


// exports.verificarEstadoPeriodoHorarios = async (req, res) => {
//     try {
//         // Consulta para obtener el estado actual del período de horarios
//         const query = `SELECT Periodo_horarios FROM Configuracion WHERE Id_configuracion = 1;`;
//         // Ejecutar la consulta
//         const [rows] = await mysqlPool.execute(query);
//         // Verificar si se obtuvo un resultado válido
//         if (rows.length > 0) {
//             const estado = rows[0].Periodo_horarios;
//             res.status(200).json({ estado: estado === 1 ? 'habilitado' : 'deshabilitado' });
//         } else {
//             res.status(404).json({ mensaje: 'No se encontró configuración' });
//         }
//     } catch (error) {
//         console.error('Error al verificar el estado del periodo de horarios:', error);
//         res.status(500).json({ mensaje: 'Error en el servidor' });
//     }
// };