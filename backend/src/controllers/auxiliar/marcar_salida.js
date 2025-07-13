const mysqlPool = require('../../config/conexion');

exports.marcar_salida = async (req, res) => {
    const { rfid } = req.body;

    try {
        const fecha = new Date();
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        const diaSemana = diasSemana[fecha.getDay()];
        const fechaHoy = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        
        const horaActual = fecha.toTimeString().split(' ')[0]; // Obtener la hora actual

        console.log(`Hoy es ${diaSemana}, la hora actual de prueba es ${horaActual}`);
        console.log(`La hora actual es ${horaActual}`);

        // Obtener los horarios del auxiliar para ese día

        const [rows] = await mysqlPool.query("CALL ObtenerHorariosAuxiliarPorRFID(?, ?)", [rfid, diaSemana]);
        if (rows[0].length === 0) {
            return res.status(400).json({ mensaje: "No se encontraron horarios para el auxiliar en este día" });
        }
        const idAuxiliar = rows[0][0].Id_auxiliar;
        console.log(rows[0]);

        let salidaMarcada = false; // Flag para verificar si ya se marcó la salida

        
        for (let horario of rows[0]) {
            const horaSalida = horario.Hora_salida;
            const idHorario = horario.Id_horario;

            const [asistenciaEntrada] = await mysqlPool.query(
                "SELECT * FROM Asistencia_Entrada WHERE Id_auxiliar = ? AND Id_horario = ? AND Fecha = ?",
                [idAuxiliar, idHorario, fechaHoy]
            );
            if (asistenciaEntrada.length === 0) {
                console.log(`No ha marcado entrada en el horario de ${horaSalida}, no puede marcar salida.`);
                res.status(400).json({ mensaje: `No ha marcado entrada en el horario de ${horaSalida}, no puede marcar salida.` });
                return; // Si no ha marcado entrada, no puede marcar salida
            }


            // Verificar si ya marcó asistencia en ese horario
            const [asistencia] = await mysqlPool.query(
                "SELECT * FROM Asistencia_Salida WHERE Id_auxiliar = ? AND Id_horario = ? AND Fecha = ?",
                [idAuxiliar, idHorario, fechaHoy]
            );

            if (asistencia.length > 0) {
                console.log(`Ya marcó salida en el horario de ${horaSalida}`);
                res.status(400).json({ mensaje: `Ya marcó salida en el horario de ${horaSalida}` });
                return;
            }

            // Calcular rango de marcación (20 minutos antes o después)
            const horaSalidaDate = new Date(`${fechaHoy}T${horaSalida}`);
            const rangoInicio = new Date(horaSalidaDate.getTime() - 20 * 60000); // -20 min
            const rangoFin = new Date(horaSalidaDate.getTime() + 20 * 60000); // +20 min
            const horaActualDate = new Date(`${fechaHoy}T${horaActual}`); // Usamos la hora de prueba

            if (horaActualDate >= rangoInicio && horaActualDate <= rangoFin) {
                // Crear el valor de Hora_marcacion como un DATETIME
                const horaMarcacion = `${fechaHoy}T${horaActual}`; // Combina la fecha con la hora para el DATETIME

                await mysqlPool.query(
                    "INSERT INTO Asistencia_Salida (Id_auxiliar, Id_horario, Fecha, Hora_marcacion) VALUES (?, ?, ?, ?)",
                    [idAuxiliar, idHorario, fechaHoy, horaMarcacion]
                );
                console.log(`Salida marcada para el auxiliar ${idAuxiliar} en el horario de ${horaSalida}`);
                salidaMarcada = true;
                break; // Salir del bucle una vez que se ha marcado la salida
            } else {
                console.log(`Fuera del rango permitido para marcar salida en el horario de ${horaSalida}`);
            }
        }
        if (salidaMarcada) {
            res.status(200).json({ mensaje: "Salida marcada exitosamente" });
        } else {
            res.status(400).json({ mensaje: "No se puede marcar salida fuera del rango permitido" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al marcar la salida" });
    }
};
