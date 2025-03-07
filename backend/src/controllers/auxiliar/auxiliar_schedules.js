const mysql = require('mysql2/promise');
const config = require('../../config/config');
const { verificarEstadoPeriodoHorarios } = require('../status_schedules');

exports.agregarHorarioPracticante = async (req, res) => {
    try {
        //verificamos si el periodo para agregar horarios esta activado
        const estadoPeriodo = await verificarEstadoPeriodoHorarios();

        if (estadoPeriodo === 0) {
            return res.status(400).json({ mensaje: 'El periodo de horarios está cerrado. No se pueden agregar horarios.' });
        } else if (estadoPeriodo === null) {
            return res.status(404).json({ mensaje: 'No se encontró configuración en la base de datos.' });
        }
        const { id_auxiliar, dia_semana, hora_entrada, hora_salida } = req.body;
        if (!id_auxiliar || !dia_semana || !hora_entrada || !hora_salida) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }
        const connection = await mysql.createConnection(config.db);
        const queryInsertHorario = `
            INSERT INTO Horario (Dia_semana, Hora_entrada, Hora_salida)
            VALUES (?, ?, ?);
        `;
        const [horarioResult] = await connection.execute(queryInsertHorario, [dia_semana, hora_entrada, hora_salida]);
        const id_horario = horarioResult.insertId;// guardamos el id de la hora insertada
        const queryInsertAuxiliarHorario = ` 
            INSERT INTO Auxiliar_Horario (Id_auxiliar, Id_horario)
            VALUES (?, ?);
        `; //para usarlo en esta otra parte, una tabla para relacionar horarios con auxiliares
        await connection.execute(queryInsertAuxiliarHorario, [id_auxiliar, id_horario]);
        await connection.end();
        res.status(200).json({ mensaje: 'Horario agregado y asignado exitosamente al auxiliar' });
    } catch (error) {
        console.error('Error al agregar el horario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
