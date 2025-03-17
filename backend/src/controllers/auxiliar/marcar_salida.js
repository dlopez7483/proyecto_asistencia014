const mysql = require('mysql2/promise');
const config = require('../../config/config');

exports.marcar_salida = async (req, res) => {
    const { rfid } = req.body;

    try {
        const pool = mysql.createPool(config.db);
        const connection = await pool.getConnection();

        // ***** Valores fijos para pruebas *****
        const diaSemana = "Viernes";          // Día fijo para pruebas
        const fechaHoy = "2025-03-14";          // Fecha fija (YYYY-MM-DD)
        const horaPrueba = "18:45:00";          // Hora de salida fija para pruebas
        // ****************************************

        console.log(`Hoy es ${diaSemana}, la hora de salida de prueba es ${horaPrueba}`);

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
                continue;
            }

            // Calcular el rango permitido para marcar salida (20 minutos antes o después de la hora programada de salida)
            const horaSalidaDate = new Date(`${fechaHoy}T${Hora_salida}`);
            const rangoSalidaInicio = new Date(horaSalidaDate.getTime() - 20 * 60000); // 20 min antes
            const rangoSalidaFin = new Date(horaSalidaDate.getTime() + 20 * 60000);     // 20 min después
            const horaSalidaActualDate = new Date(`${fechaHoy}T${horaPrueba}`);           // Usamos la hora de prueba

            console.log(`Hora programada de salida: ${Hora_salida}`);
            console.log(`Rango permitido para salida: ${rangoSalidaInicio.toTimeString()} - ${rangoSalidaFin.toTimeString()}`);
            console.log(`Hora de prueba para salida: ${horaSalidaActualDate.toTimeString()}`);

            // Verificar si la hora de prueba está dentro del rango permitido
            if (horaSalidaActualDate >= rangoSalidaInicio && horaSalidaActualDate <= rangoSalidaFin) {
                // Ajustar la hora de salida si es necesario, según la diferencia con la hora programada
                let horaSalidaAjustada;
                if (horaSalidaActualDate < horaSalidaDate) {
                    const diferenciaMinutos = (horaSalidaDate - horaSalidaActualDate) / 60000;
                    horaSalidaAjustada = new Date(horaSalidaDate);
                    horaSalidaAjustada.setMinutes(horaSalidaAjustada.getMinutes() - diferenciaMinutos);
                } else if (horaSalidaActualDate > horaSalidaDate) {
                    const diferenciaMinutos = (horaSalidaActualDate - horaSalidaDate) / 60000;
                    horaSalidaAjustada = new Date(horaSalidaDate);
                    horaSalidaAjustada.setMinutes(horaSalidaAjustada.getMinutes() + diferenciaMinutos);
                } else {
                    horaSalidaAjustada = new Date(horaSalidaDate);
                }

                // Crear el valor de Hora_marcacion (DATETIME combinando fecha y hora de prueba)
                const horaMarcacion = `${fechaHoy}T${horaPrueba}`;

                // Insertar la asistencia de salida
                await connection.query(
                    "INSERT INTO Asistencia_Salida (Id_auxiliar, Id_horario, Fecha, Hora_marcacion) VALUES (?, ?, ?, ?)",
                    [idAuxiliar, Id_horario, fechaHoy, horaMarcacion]
                );

                console.log(`Salida marcada para el auxiliar ${idAuxiliar} en horario ajustado: ${horaSalidaAjustada.toTimeString()}`);
                salidaMarcada = true;
                break;
            }
        }

        connection.release();

        if (salidaMarcada) {
            res.status(200).json({ mensaje: "Salida marcada exitosamente" });
        } else {
            res.status(400).json({ mensaje: "No se puede marcar salida fuera del rango permitido o no ha marcado entrada" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al conectar a la base de datos" });
    }
};
