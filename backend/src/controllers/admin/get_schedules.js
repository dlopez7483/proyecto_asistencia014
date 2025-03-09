const mysql = require('mysql2/promise');
const config = require('../../config/config');

exports.obtenerHorariosAuxiliar = async (req, res) => {
    try {
        const { carne } = req.params; // Obtener el parámetro de la URL

        if (!carne) {
            return res.status(400).json({ mensaje: 'El número de carné es obligatorio' });
        }

        const connection = await mysql.createConnection(config.db);

        // Primero obtenemos los datos del auxiliar
        const queryAuxiliar = `
            SELECT Carne, Nombre, Codigo_RFID
            FROM Auxiliar
            WHERE Carne = ?;
        `;

        const [auxiliar] = await connection.execute(queryAuxiliar, [carne]);

        if (auxiliar.length === 0) {
            await connection.end();
            return res.status(404).json({ mensaje: 'El auxiliar no existe' });
        }

        // Ahora obtenemos los horarios asociados
        const queryHorarios = `
            SELECT H.Id_horario, H.Dia_semana, H.Hora_entrada, H.Hora_salida
            FROM Auxiliar A
            JOIN Auxiliar_Horario AH ON A.Id_auxiliar = AH.Id_auxiliar
            JOIN Horario H ON AH.Id_horario = H.Id_horario
            WHERE A.Carne = ?;
        `;

        const [horarios] = await connection.execute(queryHorarios, [carne]);
        await connection.end();

        // Construimos la respuesta
        const respuesta = {
            carne: auxiliar[0].Carne,
            nombre: auxiliar[0].Nombre,
            codigo_RFID: auxiliar[0].Codigo_RFID,
            horarios: horarios.length > 0 ? horarios.map(horario => ({
                Id_horario: horario.Id_horario,
                Dia_semana: horario.Dia_semana,
                Hora_entrada: horario.Hora_entrada,
                Hora_salida: horario.Hora_salida
            })) : [] // Retorna una lista vacía si no tiene horarios
        };

        res.status(200).json(respuesta);

    } catch (error) {
        console.error('Error al obtener horarios del auxiliar:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
