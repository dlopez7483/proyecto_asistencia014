const mysqlPool = require('../../config/conexion');
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
        const obtner_horarios_auxiliar = `
               SELECT
               ha.Hora_entrada,
               ha.Hora_salida,
               ha.Dia_semana
               FROM Horario ha
               INNER JOIN Auxiliar_Horario h ON ha.Id_horario = h.Id_horario
               INNER JOIN Auxiliar a ON  h.Id_auxiliar= a.Id_auxiliar
               WHERE a.Id_auxiliar = ?
               AND ha.Dia_semana = ?;

         `;
         
        // Conectar a la base de datos
        const [horariosAuxiliar] = await mysqlPool.execute(obtner_horarios_auxiliar, [id_auxiliar, dia_semana]);
        console.log('Horarios del auxiliar:', horariosAuxiliar);
        for (let i = 0; i < horariosAuxiliar.length; i++) {
            const horario = horariosAuxiliar[i];
            const horaEntrada = horario.Hora_entrada;
            const horaSalida = horario.Hora_salida;
            
        
        // Convertir las horas a milisegundos desde la medianoche
        const fechaBase = "1970-01-01";

        // Asegura formato HH:mm:ss rellenando cada parte si es necesario
        const formatHora = (hora) => {
            const [h, m, s] = hora.split(':');
            console.log('Hora:', hora, 'h:', h, 'm:', m, 's:', s); // Debugging
            return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
        };

        const entradaExistente = new Date(`${fechaBase}T${formatHora(horaEntrada)}`).getTime();
        const salidaExistente = new Date(`${fechaBase}T${formatHora(horaSalida)}`).getTime();
        const nuevaEntrada = new Date(`${fechaBase}T${formatHora(hora_entrada+":00")}`).getTime();
        const nuevaSalida = new Date(`${fechaBase}T${formatHora(hora_salida+":00")}`).getTime();

        console.log('Entrada existente:', entradaExistente);
        console.log('Salida existente:', salidaExistente);
        console.log('Nueva entrada:', nuevaEntrada);
        console.log('Nueva salida:', nuevaSalida);
        
            // Verificar si el nuevo horario se solapa con los horarios existentes
            if (nuevaEntrada < salidaExistente && nuevaSalida > entradaExistente) {
                return res.status(400).json({ mensaje: 'El nuevo horario traslapa con un horario existente' });
            }
        }


        

        // Insertar nuevo horario
        const queryInsertHorario = `
            INSERT INTO Horario (Dia_semana, Hora_entrada, Hora_salida)
            VALUES (?, ?, ?);
        `;
        const [horarioResult] = await mysqlPool.execute(queryInsertHorario, [dia_semana, hora_entrada, hora_salida]);
        const id_horario = horarioResult.insertId; // Guardamos el ID del horario insertado

        // Asociar el horario con el auxiliar autenticado
        




        const queryInsertAuxiliarHorario = ` 
            INSERT INTO Auxiliar_Horario (Id_auxiliar, Id_horario)
            VALUES (?, ?);
        `;
        await mysqlPool.execute(queryInsertAuxiliarHorario, [id_auxiliar, id_horario]);
        
        res.status(200).json({ mensaje: 'Horario agregado y asignado exitosamente al auxiliar' });

    } catch (error) {
        console.error('Error al agregar el horario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
