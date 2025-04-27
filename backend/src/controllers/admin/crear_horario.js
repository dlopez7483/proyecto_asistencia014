const mysql = require('mysql2/promise');
const config = require('../../config/config');


exports.crear_horario = async (req, res) => {
    try {
         const connection = await mysql.createConnection(config.db);
         const { dia_semana, hora_entrada, hora_salida,carne} = req.body;
            if (!dia_semana || !hora_entrada || !hora_salida) {
                return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
            }
            // Insertar nuevo horario
         const verificarHorarioQuery = `
            SELECT Id_horario FROM Horario WHERE Dia_semana = ? AND Hora_entrada = ? AND Hora_salida = ?;
         `;
         const obtener_id_aux = `
            SELECT Id_auxiliar FROM Auxiliar WHERE Carne = ?;
         `;

         
         

         const [Id_auxiliar] = await connection.execute(obtener_id_aux, [carne]);
         const [verificarHorario] = await connection.execute(verificarHorarioQuery, [dia_semana, hora_entrada, hora_salida]); 
         const obtner_horarios_auxiliar = `
               SELECT
               ha.Hora_entrada,
               ha.Hora_salida,
               ha.Dia_semana
               FROM horario ha
               INNER JOIN auxiliar_horario h ON ha.Id_horario = h.Id_horario
               INNER JOIN Auxiliar a ON  h.Id_auxiliar= a.Id_auxiliar
               WHERE a.Id_auxiliar = ?
               AND ha.Dia_semana = ?;

         `;


         const [horariosAuxiliar] = await connection.execute(obtner_horarios_auxiliar, [Id_auxiliar[0].Id_auxiliar, dia_semana]);
         
         for (let i = 0; i < horariosAuxiliar.length; i++) {
            const horario = horariosAuxiliar[i];
            const horaEntrada = horario.Hora_entrada;
            const horaSalida = horario.Hora_salida;
        
            
        
        // Convertir las horas a milisegundos desde la medianoche
        const fechaBase = "1970-01-01";

        // Asegura formato HH:mm:ss rellenando cada parte si es necesario
        const formatHora = (hora) => {
            const [h, m, s] = hora.split(':');
            return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
        };

        const entradaExistente = new Date(`${fechaBase}T${formatHora(horaEntrada)}`).getTime();
        const salidaExistente = new Date(`${fechaBase}T${formatHora(horaSalida)}`).getTime();
        const nuevaEntrada = new Date(`${fechaBase}T${formatHora(hora_entrada)}`).getTime();
        const nuevaSalida = new Date(`${fechaBase}T${formatHora(hora_salida)}`).getTime();

        console.log('Entrada existente:', entradaExistente);
        console.log('Salida existente:', salidaExistente);
        console.log('Nueva entrada:', nuevaEntrada);
        console.log('Nueva salida:', nuevaSalida);
        
            // Verificar si el nuevo horario se solapa con los horarios existentes
            if (nuevaEntrada < salidaExistente && nuevaSalida > entradaExistente) {
                await connection.destroy(); // Cerrar conexión
                return res.status(400).json({ mensaje: 'El nuevo horario traslapa con un horario existente' });
            }
        }
         
         if (verificarHorario.length > 0) {
            const id_horario = verificarHorario[0].Id_horario;

            const agregarHorarioQuery = `
                INSERT INTO Auxiliar_Horario(Id_horario, Id_auxiliar) VALUES (?, ?);
            `;
            await connection.execute(agregarHorarioQuery, [id_horario, Id_auxiliar[0].Id_auxiliar]);
            connection.destroy(); // Cerrar conexión
            return res.status(200).json({ mensaje: 'Horario agregado exitosamente' });
            
         }
         const agregarHorarioQuery = `
            INSERT INTO Horario (Dia_semana, Hora_entrada, Hora_salida) VALUES (?, ?, ?);
         `;
         const [resultado] = await connection.execute(agregarHorarioQuery, [dia_semana, hora_entrada, hora_salida]);
         const id_horario = resultado.insertId; // Obtener el ID del nuevo horario
         const agregarHorarioAuxQuery = `
                INSERT INTO Auxiliar_Horario (Id_horario, Id_auxiliar) VALUES (?, ?);
            `;
         await connection.execute(agregarHorarioAuxQuery, [id_horario, Id_auxiliar[0].Id_auxiliar]);

         
         connection.destroy(); // Cerrar conexión

         res.status(200).json({ mensaje: 'Horario creado exitosamente' });

    } catch (error) {
        console.error('Error al crear horario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}
// Cerrar el pool de conexiones si es necesario





