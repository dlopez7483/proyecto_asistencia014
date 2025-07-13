const mysqlPool = require('../../config/conexion');

exports.marcar_entrada = async (req, res) => {
    const { rfid } = req.body;
    
    try {
        // Establecer la zona horaria de Guatemala (UTC-6)
        const fecha = new Date();

        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const diaSemana = diasSemana[fecha.getDay()];
        
        // Obtener la hora actual en formato HH:mm:ss en zona horaria de Guatemala
        const horaActual = fecha.toLocaleTimeString('es-GT', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

        console.log(`Hoy es ${diaSemana}, la hora actual en Guatemala es ${horaActual}`);
        console.log(fecha.toLocaleString('en-US', { timeZone: 'America/Guatemala' }));

        // Obtener los horarios del auxiliar para ese día
        const [rows] = await mysqlPool.query("CALL ObtenerHorariosAuxiliarPorRFID(?, ?)", [rfid, diaSemana]);
        if (rows[0].length === 0) {
            return res.status(400).json({ mensaje: "No se encontraron horarios para el auxiliar en este día" });
        }

        const idAuxiliar = rows[0][0].Id_auxiliar;
        const fechaHoy = fecha.toLocaleDateString("sv-VS"); // Formato YYYY-MM-DD
        console.log(`Fecha de hoy: ${fechaHoy}`);
        console.log(rows[0]);

        let entradaMarcada = false; // Flag para verificar si ya se marcó la entrada

        for (let horario of rows[0]) {
            const horaEntrada = horario.Hora_entrada;
            const idHorario = horario.Id_horario;

            // Verificar si ya marcó asistencia en ese horario
            const [asistencia] = await mysqlPool.query(
                "SELECT * FROM Asistencia_Entrada WHERE Id_auxiliar = ? AND Id_horario = ? AND Fecha = ?",
                [idAuxiliar, idHorario, fechaHoy]
            );

            if (asistencia.length > 0) {
                console.log(`Ya marcó entrada en el horario de ${horaEntrada}`);
                continue; // Saltar al siguiente horario si ya marcó la entrada
            }

            // Calcular rango de marcación (20 minutos antes o después)
            const horaEntradaDate = new Date(`${fechaHoy} ${horaEntrada}`);
            const rangoInicio = new Date(horaEntradaDate.getTime() - 20 * 60000); // -20 min
            const rangoFin = new Date(horaEntradaDate.getTime() + 20 * 60000); // +20 min
            const horaActualDate = new Date(`${fechaHoy} ${horaActual}`); // Usamos la hora de prueba
            console.log(`Hora de entrada: ${horaEntrada}`);
            console.log(`Rango de marcación: ${rangoInicio} - ${rangoFin}`);
            console.log(`Hora actual: ${horaActualDate}`);

            if (horaActualDate >= rangoInicio && horaActualDate <= rangoFin) {
                // Crear el valor de Hora_marcacion como un DATETIME
                const horaMarcacion = `${fechaHoy} ${horaActual}`; // Combina la fecha con la hora para el DATETIME

                // Insertar asistencia
                await mysqlPool.query(
                    "INSERT INTO Asistencia_Entrada (Id_auxiliar, Id_horario, Fecha, Hora_marcacion) VALUES (?, ?, ?, ?)",
                    [idAuxiliar, idHorario, fechaHoy, horaMarcacion] // Ahora estamos usando un DATETIME
                );

                console.log(`Entrada marcada para el auxiliar ${idAuxiliar} en horario ${horaEntrada}`);
                entradaMarcada = true;
                break; // Si ya se marcó la entrada, salimos del bucle
            }
        }

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
