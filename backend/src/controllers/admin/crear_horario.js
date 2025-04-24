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





