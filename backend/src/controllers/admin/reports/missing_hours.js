const mysqlPool = require('../../../config/conexion');

exports.reporteHorasFaltantes = async (req, res) => {
    try {
        const query = `
            SELECT 
                a.Id_auxiliar,
                a.Nombre,
                a.codigo_RFID, -- Se agrega el campo codigo_RFID
                COALESCE(SUM(TIMESTAMPDIFF(SECOND, ae.Hora_marcacion, ase.Hora_marcacion)), 0) AS horas_trabajadas,
                ((400*3600) - COALESCE(SUM(TIMESTAMPDIFF(SECOND, ae.Hora_marcacion, ase.Hora_marcacion)), 0)) AS horas_faltantes
            FROM 
                Auxiliar a
            LEFT JOIN 
                Asistencia_Entrada ae ON a.Id_auxiliar = ae.Id_auxiliar
            LEFT JOIN 
                Asistencia_Salida ase ON a.Id_auxiliar = ase.Id_auxiliar AND ae.Fecha = ase.Fecha AND ae.Id_horario = ase.Id_horario
            GROUP BY 
                a.Id_auxiliar, a.Nombre, a.codigo_RFID -- Se agregan estos campos al GROUP BY
            HAVING 
                horas_faltantes > 0;
        `;

        const [results] = await mysqlPool.execute(query);

        res.status(200).json({ reporte: results });

    } catch (error) {
        console.error('Error al generar el reporte:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
