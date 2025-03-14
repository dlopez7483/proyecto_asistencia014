const mysql = require('mysql2/promise');
const config = require('../../config/config');

exports.marcar_entrada = async (req, res) => {
    const { rfid } = req.body;
    
    try {
        const pool = mysql.createPool(config.db);
        const connection = await pool.getConnection();

        const fecha = new Date();
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        const diaSemana = diasSemana[fecha.getDay()];
        
        // Hora constante para pruebas (aquí estamos utilizando 08:00:00)
        const horaPrueba = "08:10:00"; 
        const horaActual = fecha.toTimeString().split(' ')[0]; // Obtener la hora actual

        console.log(`Hoy es ${diaSemana}, la hora actual de prueba es ${horaPrueba}`);
        console.log(`La hora actual es ${horaActual}`);
        
        // Obtener los horarios del auxiliar para ese día
        const [rows] = await connection.query("CALL ObtenerHorariosAuxiliarPorRFID(?, ?)", [rfid, diaSemana]);
        if (rows[0].length === 0) {
            connection.release();
            return res.status(400).json({ mensaje: "No se encontraron horarios para el auxiliar en este día" });
        }

        const idAuxiliar = rows[0][0].Id_auxiliar;
        const fechaHoy = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        console.log(rows[0]);

        let entradaMarcada = false; // Flag para verificar si ya se marcó la entrada

        for (let horario of rows[0]) {
            const horaEntrada = horario.Hora_entrada;
            const idHorario = horario.Id_horario;

            // Verificar si ya marcó asistencia en ese horario
            const [asistencia] = await connection.query(
                "SELECT * FROM Asistencia_Entrada WHERE Id_auxiliar = ? AND Id_horario = ? AND Fecha = ?",
                [idAuxiliar, idHorario, fechaHoy]
            );

            if (asistencia.length > 0) {
                console.log(`Ya marcó entrada en el horario de ${horaEntrada}`);
                console.log(asistencia.length);
                continue; // Saltar al siguiente horario si ya marcó la entrada
            }

            // Calcular rango de marcación (20 minutos antes o después)
            const horaEntradaDate = new Date(`${fechaHoy}T${horaEntrada}`);
            const rangoInicio = new Date(horaEntradaDate.getTime() - 20 * 60000); // -20 min
            const rangoFin = new Date(horaEntradaDate.getTime() + 20 * 60000); // +20 min
            const horaActualDate = new Date(`${fechaHoy}T${horaActual}`); // Usamos la hora de prueba

            if (horaActualDate >= rangoInicio && horaActualDate <= rangoFin) {
                // Crear el valor de Hora_marcacion como un DATETIME
                const horaMarcacion = `${fechaHoy}T${horaActual}`; // Combina la fecha con la hora para el DATETIME

                // Insertar asistencia
                await connection.query(
                    "INSERT INTO Asistencia_Entrada (Id_auxiliar, Id_horario, Fecha, Hora_marcacion) VALUES (?, ?, ?, ?)",
                    [idAuxiliar, idHorario, fechaHoy, horaMarcacion] // Ahora estamos usando un DATETIME
                );

                console.log(`Entrada marcada para el auxiliar ${idAuxiliar} en horario ${horaEntrada}`);
                entradaMarcada = true;
                break; // Si ya se marcó la entrada, salimos del bucle
            }
        }

        connection.release();

        if (entradaMarcada) {
            res.status(200).json({ mensaje: "Entrada marcada exitosamente" });
        } else {
            res.status(400).json({ mensaje: "No se puede marcar entrada fuera del rango permitido" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al conectar a la base de datos" });
    }
};

