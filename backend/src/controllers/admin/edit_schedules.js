const mysql = require('mysql2/promise');
const config = require('../../config/config');
const { verifyToken } = require('../../utils/jwtUtils'); // Importar función para verificar el token

exports.editarHorario = async (req, res) => {
    try {
        // Verificar el token
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ mensaje: 'Token no proporcionado' });
        }

        const decoded = verifyToken(token);
        // Comprobar que el rol del usuario sea del administrador
        if (decoded.id_rol !== 1) {
            return res.status(403).json({ mensaje: 'No tienes permisos para editar horarios' });
        }

        // Obtener el carne (carne) y el id_horario desde los parámetros del front
        const { carne, id_horario } = req.params;
        const { dia_semana, hora_entrada, hora_salida } = req.body;
        // console.log('Carne:', carne);
        // console.log('id_horario:', id_horario);
        // console.log('dia_semana:', dia_semana);
        // console.log('hora_entrada:', hora_entrada);
        // console.log('hora_salida:', hora_salida);

        // Validar que los datos del cuerpo sean correctos
        if (!dia_semana || !hora_entrada || !hora_salida) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        // Conectar a la base de datos
        const connection = await mysql.createConnection(config.db);

        // Obtener el id_auxiliar a partir del carne ya que no tenemos el carne en la tabla auxiliar_horario
        const queryGetIdAuxiliar = `
            SELECT Id_auxiliar FROM Auxiliar WHERE Carne = ?
        `;
        const [auxiliarResults] = await connection.execute(queryGetIdAuxiliar, [carne]);

        if (auxiliarResults.length === 0) {
            return res.status(404).json({ mensaje: 'Auxiliar no encontrado con ese carne' });
        }

        const id_auxiliar = auxiliarResults[0].Id_auxiliar;
        console.log(id_auxiliar);
        // Verificar si el horario existe para el auxiliar
        const queryCheckHorario = `
            SELECT * FROM Auxiliar_Horario
            WHERE Id_auxiliar = ? AND Id_horario = ?
        `;
        const [checkResults] = await connection.execute(queryCheckHorario, [id_auxiliar, id_horario]);

        if (checkResults.length === 0) {
            return res.status(404).json({ mensaje: 'El horario no existe para este auxiliar' });
        }

        // Actualizar el horario en la tabla Horario
        const queryUpdateHorario = `
            UPDATE Horario
            SET Dia_semana = ?, Hora_entrada = ?, Hora_salida = ?
            WHERE Id_horario = ?
        `;
        await connection.execute(queryUpdateHorario, [
            dia_semana, 
            hora_entrada,
            hora_salida,
            id_horario
        ]);

        await connection.end();
        res.status(200).json({ mensaje: 'Horario actualizado correctamente' });

    } catch (error) {
        console.error('Error al editar el horario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
