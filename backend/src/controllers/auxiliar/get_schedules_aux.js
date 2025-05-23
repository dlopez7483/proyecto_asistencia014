const mysqlPool = require('../../config/conexion');
const { verifyToken } = require('../../utils/jwtUtils'); // Importar función para verificar el token

exports.obtenerHorariosAuxiliarPersonal = async (req, res) => {
    try {
        // Obtener token del header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ mensaje: 'No autorizado. Token requerido.' });
        }

        // Verificar y decodificar el token
        const decoded = verifyToken(token);
        const carne = decoded.carne; // Extraer el carné del token

        // Consulta para obtener los horarios del auxiliar autenticado
        
        const query = `
            SELECT A.Carne, A.Nombre, A.Codigo_RFID, H.Id_horario, H.Dia_semana, H.Hora_entrada, H.Hora_salida
            FROM Auxiliar A
            INNER JOIN Auxiliar_Horario AH ON A.Id_auxiliar = AH.Id_auxiliar
            INNER JOIN Horario H ON AH.Id_horario = H.Id_horario
            WHERE A.Carne = ?;
        `;

        const [rows] = await mysqlPool.execute(query, [carne]);

        // Si no hay horarios, devolver información del auxiliar sin horarios
        if (rows.length === 0) {
            return res.status(200).json({
                carne,
                nombre: "Nombre del auxiliar no encontrado",
                codigo_RFID: "No registrado",
                horarios: []
            });
        }

        // Obtener datos del auxiliar y horarios
        const auxiliarInfo = {
            carne: rows[0].Carne,
            nombre: rows[0].Nombre,
            codigo_RFID: rows[0].Codigo_RFID,
            horarios: rows.map(row => ({
                Id_horario: row.Id_horario,
                Dia_semana: row.Dia_semana,
                Hora_entrada: row.Hora_entrada,
                Hora_salida: row.Hora_salida
            }))
        };

        return res.status(200).json(auxiliarInfo);

    } catch (error) {
        console.error('Error al obtener horarios:', error);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};