const { verificarEstadoSalidasExtemporaneas } = require("../status_salidas");
const mysql = require("mysql2/promise");
const config = require("../../config/config");

exports.marcar_salida = async (req, res) => {
  const { rfid } = req.body;

  try {
    const pool = mysql.createPool(config.db);
    const connection = await pool.getConnection();

    const fecha = new Date();

    // Día de la semana
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const diaSemana = diasSemana[fecha.getDay()];

    // Fecha local en formato YYYY-MM-DD (no UTC)
    const fechaHoy = fecha.toLocaleDateString("sv-VS"); // "2025-04-11"

    // Obtener la hora actual en formato HH:mm:ss en zona horaria de Guatemala
    const horaActual = fecha.toLocaleTimeString('es-GT', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    console.log(
      `Hoy es ${diaSemana}, la fecha local es ${fechaHoy}, la hora local es ${horaActual}`
    );

    // Obtener los horarios del auxiliar para ese día
    const [rows] = await connection.query(
      "CALL ObtenerHorariosAuxiliarPorRFID(?, ?)",
      [rfid, diaSemana]
    );
    if (rows[0].length === 0) {
      connection.release();
      return res.status(400).json({
        mensaje: "No se encontraron horarios para el auxiliar en este día",
      });
    }

    const idAuxiliar = rows[0][0].Id_auxiliar;

    // Flag para verificar si ya se marcó la entrada
    let salidaMarcada = false;
    for (let horario of rows[0]) {
      const horaEntrada = horario.Hora_entrada;
      const horaSalida = horario.Hora_salida;
      const idHorario = horario.Id_horario;

      let entradaMarcada = false; // Reiniciar el flag para cada horario
      // Flag para verificar si ya se marcó la salida
      // Verificar si ya marcó asistencia en ese horario
      console.log(idAuxiliar);
      console.log(idHorario);
      console.log(fechaHoy);
      const [asistencia] = await connection.query(
        "SELECT * FROM Asistencia_Entrada WHERE Id_auxiliar = ? AND Id_horario = ? AND Fecha = ?",
        [idAuxiliar, idHorario, fechaHoy]
      );

      console.log(asistencia);
      if (asistencia.length > 0) {
        console.log(`Ya marcó entrada en el horario de ${horaEntrada}`);
        console.log(asistencia.length);
        entradaMarcada = true; // Marcamos que ya se registró la entrada
      }

      const [asistenciaSalida] = await connection.query(
        "SELECT * FROM Asistencia_Salida WHERE Id_auxiliar = ? AND Id_horario = ? AND Fecha = ?",
        [idAuxiliar, idHorario, fechaHoy]
      );

      if (asistenciaSalida.length > 0) {
        console.log(`Ya marcó salida en el horario de ${horaSalida}`);
        continue; // Saltar al siguiente horario si ya marcó la salida
      }

      // Calcular rango de marcación (20 minutos antes o después)
      const horasalidaDate = new Date(`${fechaHoy} ${horaSalida}`);
      const rangoInicio = new Date(horasalidaDate.getTime() - 20 * 60000); // -20 min
      const rangoFin = new Date(horasalidaDate.getTime() + 20 * 60000); // +20 min
      const horaActualDate = new Date(`${fechaHoy} ${horaActual}`); // Usamos la hora local
      const salidasExtemporaneas = await verificarEstadoSalidasExtemporaneas();
      console.log("Estado de salidas extemporaneas: ", salidasExtemporaneas);
      console.log("Rango de marcación: ", horaActualDate <= rangoFin);
      console.log("entradaMarcada: ", entradaMarcada);
      
      if (
        (salidasExtemporaneas == 1 &&
          horaActualDate <= rangoFin &&
          entradaMarcada) ||
        (horaActualDate >= rangoInicio &&
          horaActualDate <= rangoFin &&
          entradaMarcada)
      ) {
        // Crear el valor de Hora_marcacion como un DATETIME
        const horaMarcacion = `${fechaHoy} ${horaActual}`; // Combina la fecha con la hora para el DATETIME

        // Insertar asistencia
        await connection.query(
          "INSERT INTO Asistencia_Salida (Id_auxiliar, Id_horario, Fecha, Hora_marcacion) VALUES (?, ?, ?, ?)",
          [idAuxiliar, idHorario, fechaHoy, horaMarcacion] // Ahora estamos usando un DATETIME
        );

        console.log(
          `Salida marcada para el auxiliar ${idAuxiliar} en horario ${horaSalida}`
        );
        salidaMarcada = true;
        break; // Si ya se marcó la salida, salimos del bucle
      } else if (horaActualDate < rangoInicio) {
        console.log(
          `No se puede marcar salida antes de las ${rangoInicio.toLocaleTimeString()}`
        );
      } else if (horaActualDate > rangoFin) {
        console.log(
          `No se puede marcar salida después de las ${rangoFin.toLocaleTimeString()}`
        );
      }
    }

    connection.release();

    if (salidaMarcada) {
      res.status(200).json({ mensaje: "Salida marcada exitosamente" });
    } else {
      res.status(400).json({
        mensaje: "No se puede marcar salida fuera del rango permitido",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al conectar a la base de datos" });
  }
};
