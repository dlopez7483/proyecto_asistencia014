const mysql = require('mysql2/promise');
const config = require('../../config/config');

exports.marcar_salida = async (req, res) => {
    const { rfid } = req.body;

    try {
        const pool = mysql.createPool(config.db);
        const connection = await pool.getConnection();

        const fecha = new Date();
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const diaSemana = diasSemana[fecha.getDay()];

        // Hora constante para pruebas (puedes cambiarla por la real)
        const horaPrueba = "16:10:00"; 
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

        let salidaMarcada = false; // Flag para verificar si ya se marcó la salida

        for (let horario of rows[0]) {
            const horaSalida = horario.Hora_salida;
            const idHorario = horario.Id_horario;

            // Verificar si ya marcó salida en ese horario
            const [asistenciaSalida] = await connection.query(
                "SELECT * FROM Asistencia_Salida WHERE Id_auxiliar = ? AND Id_horario = ? AND Fecha = ?",
                [idAuxiliar, idHorario, fechaHoy]
            );

            if (asistenciaSalida.length > 0) {
                console.log(`Ya marcó salida en el horario de ${horaSalida}`);
                continue; // Saltar al siguiente horario si ya marcó la salida
            }

            // Verificar si marcó entrada antes de permitir la salida
            const [asistenciaEntrada] = await connection.query(
                "SELECT * FROM Asistencia_Entrada WHERE Id_auxiliar = ? AND Id_horario = ? AND Fecha = ?",
                [idAuxiliar, idHorario, fechaHoy]
            );

            if (asistenciaEntrada.length === 0) {
                console.log(`No ha marcado entrada en el horario de ${horaSalida}, no puede marcar salida.`);
                continue; // No permitir salida si no hay entrada registrada
            }

            // Calcular el rango de marcación para la entrada (20 minutos antes o después)
            const horaEntradaDate = new Date(`${fechaHoy}T${horario.Hora_entrada}`); // Hora programada de entrada
            const rangoEntradaInicio = new Date(horaEntradaDate.getTime() - 20 * 60000); // -20 min de margen
            const rangoEntradaFin = new Date(horaEntradaDate.getTime() + 20 * 60000); // +20 min de margen
            const horaEntradaActualDate = new Date(`${fechaHoy}T${horaActual}`); // Hora actual para verificar entrada

            // Verificar si la hora de entrada está dentro del rango
            if (horaEntradaActualDate >= rangoEntradaInicio && horaEntradaActualDate <= rangoEntradaFin) {
                let horaSalidaAjustada;

                // Si entró antes de la hora programada, ajustamos la hora de salida hacia adelante
                if (horaEntradaActualDate < horaEntradaDate) {
                    const diferenciaMinutos = (horaEntradaDate - horaEntradaActualDate) / 60000; // Diferencia en minutos
                    horaSalidaAjustada = new Date(horaSalidaDate); // Hora programada de salida
                    horaSalidaAjustada.setMinutes(horaSalidaAjustada.getMinutes() + diferenciaMinutos); // Ajustamos según la diferencia de entrada
                } 
                // Si entró después de la hora programada, ajustamos la hora de salida hacia atrás
                else if (horaEntradaActualDate > horaEntradaDate) {
                    const diferenciaMinutos = (horaEntradaActualDate - horaEntradaDate) / 60000; // Diferencia en minutos
                    horaSalidaAjustada = new Date(horaSalidaDate); // Hora programada de salida
                    horaSalidaAjustada.setMinutes(horaSalidaAjustada.getMinutes() - diferenciaMinutos); // Ajustamos según la diferencia de entrada
                } 
                else {
                    horaSalidaAjustada = new Date(horaSalidaDate); // Si entró a la hora exacta, no hay ajuste
                }

                // Ahora tenemos `horaSalidaAjustada`, que es la hora de salida ajustada según la entrada
                const horaMarcacion = `${fechaHoy}T${horaActual}`; // Combina la fecha con la hora actual para el DATETIME

                // Insertar asistencia de salida con la hora ajustada
                await connection.query(
                    "INSERT INTO Asistencia_Salida (Id_auxiliar, Id_horario, Fecha, Hora_marcacion) VALUES (?, ?, ?, ?)",
                    [idAuxiliar, idHorario, fechaHoy, horaMarcacion]
                );

                console.log(`Salida marcada para el auxiliar ${idAuxiliar} en horario ${horaSalidaAjustada}`);
                salidaMarcada = true;
                break; // Si ya se marcó la salida, salimos del bucle
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
