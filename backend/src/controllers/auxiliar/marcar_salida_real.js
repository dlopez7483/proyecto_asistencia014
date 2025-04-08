const mysql = require('mysql2/promise');
const config = require('../../config/config');

exports.marcar_salida = async (req, res) => {
    const { rfid } = req.body;

    try {
        const pool = mysql.createPool(config.db);
        const connection = await pool.getConnection();

        // ***** Valores fijos para pruebas *****
      
        // ****************************************
        
        const fecha = new Date();
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        const diaSemana = diasSemana[fecha.getDay()];
        const fechaHoy = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        console.log(`Hoy es ${diaSemana}, la fecha de prueba es ${fechaHoy}`);
        // Hora constante para pruebas (aquí estamos utilizando 08:00:00)
        const horaPrueba = "08:10:00"; 
        const horaActual = fecha.toTimeString().split(' ')[0]; // Obtener la hora actual
        console.log(`Hoy es ${diaSemana}, la hora de salida de prueba es ${horaPrueba}`);
        console.log(`La hora actual es ${horaActual}`);

        // Obtener los horarios del auxiliar para ese día (usando el día de prueba)
        const [rows] = await connection.query("CALL ObtenerHorariosAuxiliarPorRFID(?, ?)", [rfid, diaSemana]);
        if (rows[0].length === 0) {
            connection.release();
            return res.status(400).json({ mensaje: "No se encontraron horarios para el auxiliar en este día" });
        }

        const idAuxiliar = rows[0][0].Id_auxiliar;
        console.log("Horarios encontrados:", rows[0]);

        let salidaMarcada = false; // Flag para verificar si ya se marcó la salida

        for (let horario of rows[0]) {
            const { Hora_salida, Hora_entrada, Id_horario } = horario;

            // Verificar si ya marcó salida en ese horario
            const [asistenciaSalida] = await connection.query(
                "SELECT * FROM Asistencia_Salida WHERE Id_auxiliar = ? AND Id_horario = ? AND Fecha = ?",
                [idAuxiliar, Id_horario, fechaHoy]
            );
            if (asistenciaSalida.length > 0) {
                console.log(`Ya marcó salida en el horario de ${Hora_salida}`);
                continue;
            }

            // Verificar que haya marcado entrada previamente
            const [asistenciaEntrada] = await connection.query(
                "SELECT * FROM Asistencia_Entrada WHERE Id_auxiliar = ? AND Id_horario = ? AND Fecha = ?",
                [idAuxiliar, Id_horario, fechaHoy]
            );
            if (asistenciaEntrada.length === 0) {
                console.log(`No ha marcado entrada en el horario de ${Hora_salida}, no puede marcar salida.`);
                return res.status(400).json({ mensaje: "No ha marcado entrada, no puede marcar salida." });
                continue;
            }

            // Calcular el rango permitido
            const horaSalidaDate = new Date(`${fechaHoy}T${Hora_salida}`);
            const rangoSalidaInicio = new Date(horaSalidaDate.getTime() - 20 * 60000); // 20 min antes
            const rangoSalidaFin = new Date(horaSalidaDate.getTime() + 20 * 60000);     // 20 min después
            const horaSalidaActualDate = new Date(`${fechaHoy}T${horaActual}`);           // Usamos la hora de prueba
            
            console.log(`Hora programada de salida: ${Hora_salida}`);
            console.log(`Hora de salida actual: ${horaActual}`);
            console.log(`Rango permitido para salida: ${rangoSalidaInicio.toTimeString()} - ${rangoSalidaFin.toTimeString()}`);
            console.log(`Hora de prueba para salida: ${horaSalidaActualDate.toTimeString()}`);

            // Verificar si la hora de prueba está dentro del rango permitido
            if (horaSalidaActualDate >= rangoSalidaInicio && horaSalidaActualDate <= rangoSalidaFin) {
                // Insertar la salida en la base de datos
                const horaMarcacionSalida = `${fechaHoy}T${horaActual}`; // Combina la fecha con la hora para el DATETIME
                await connection.query(
                    "INSERT INTO Asistencia_Salida (Id_auxiliar, Id_horario, Fecha, Hora_marcacion) VALUES (?, ?, ?, ?)",
                    [idAuxiliar, Id_horario, fechaHoy, horaMarcacionSalida]
                );
                console.log(`Salida marcada para el horario de ${Hora_salida}`);
                salidaMarcada = true;
            } else {
                console.log(`Fuera del rango permitido para marcar salida en el horario de ${Hora_salida}`);
            }
        }

        connection.release();
        if (salidaMarcada) {
            return res.status(200).json({ mensaje: "Salida marcada correctamente" });
        } else {
            return res.status(400).json({ mensaje: "No se pudo marcar la salida, fuera del rango permitido" });
        }
    }
    catch (error) {
        console.error("Error al marcar salida:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
    

    // Cerrar el pool de conexiones si es necesario
    // await pool.end(); // Descomentar si deseas cerrar el pool después de cada operación




};
