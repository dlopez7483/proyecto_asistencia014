const mysql = require('mysql2/promise');
const config = require('../../config/config');
const { verificarEstadoPeriodoHorarios } = require('../status_schedules');
const { verifyToken } = require('../../utils/jwtUtils'); // Importar función para verificar el token

exports.agregarHorarioPracticante = async (req, res) => {
    try {
        // Obtener token del header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ mensaje: 'No autorizado. Token requerido.' });
        }

        // Verificar y decodificar el token
        const decoded = verifyToken(token);
        const id_auxiliar = decoded.id_usuario; // Extraer el id_auxiliar del token

        // Verificamos si el periodo para agregar horarios está activado
        const estadoPeriodo = await verificarEstadoPeriodoHorarios();
        if (estadoPeriodo === 0) {
            return res.status(400).json({ mensaje: 'El periodo de horarios está cerrado. No se pueden agregar horarios.' });
        } else if (estadoPeriodo === null) {
            return res.status(404).json({ mensaje: 'No se encontró configuración en la base de datos.' });
        }

        // Extraer datos del cuerpo de la petición
        const { dia_semana, hora_entrada, hora_salida } = req.body;
        if (!dia_semana || !hora_entrada || !hora_salida) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        // Conectar a la base de datos
        const connection = await mysql.createConnection(config.db);

        // Insertar nuevo horario
        const queryInsertHorario = `
            INSERT INTO Horario (Dia_semana, Hora_entrada, Hora_salida)
            VALUES (?, ?, ?);
        `;
        const [horarioResult] = await connection.execute(queryInsertHorario, [dia_semana, hora_entrada, hora_salida]);
        const id_horario = horarioResult.insertId; // Guardamos el ID del horario insertado

        // Asociar el horario con el auxiliar autenticado
        const queryInsertAuxiliarHorario = ` 
            INSERT INTO Auxiliar_Horario (Id_auxiliar, Id_horario)
            VALUES (?, ?);
        `;
        await connection.execute(queryInsertAuxiliarHorario, [id_auxiliar, id_horario]);

        // Cerrar conexión
        await connection.end();

        res.status(200).json({ mensaje: 'Horario agregado y asignado exitosamente al auxiliar' });

    } catch (error) {
        console.error('Error al agregar el horario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
