const mysql = require('mysql2/promise');
const config = require('../../config/config');

exports.getAllSchedules = async (req, res) => {
    try {
        const connection = await mysql.createConnection(config.db);

        // Ahora obtenemos los horarios asociados
        const queryHorarios = `
            SELECT H.Id_horario, H.Dia_semana, H.Hora_entrada, H.Hora_salida, A.Carne, A.Nombre, A.Apellido
            FROM Auxiliar A
            JOIN Auxiliar_Horario AH ON A.Id_auxiliar = AH.Id_auxiliar
            JOIN Horario H ON AH.Id_horario = H.Id_horario;
        `;

        const [horarios] = await connection.execute(queryHorarios);
        await connection.end();

        // Construimos la respuesta
        const respuesta = {
            horarios: horarios.length > 0 ? horarios.map(horario => ({
                Id_horario: horario.Id_horario,
                Dia_semana: horario.Dia_semana,
                Hora_entrada: horario.Hora_entrada,
                Hora_salida: horario.Hora_salida,
                Nombre: horario.Nombre,
                Apellido: horario.Apellido,
                Carne: horario.Carne
            })) : [] // Retorna una lista vacía si no tiene horarios
        };

        res.status(200).json(respuesta);

    } catch (error) {
        console.error('Error al obtener horarios del auxiliar:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
