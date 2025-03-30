import { FormatEventC, EventC } from "@common/interfaces/CalendarEvents";
import { getCurrentWeekDays, getDayIndex } from ".";

// Formatear las fechas para el calendario
export default function formatDate(horarios: EventC[]) {
  const events: FormatEventC[] = [];
  const daysOfWeek = getCurrentWeekDays();

  horarios.forEach((horario) => {
    const start = new Date();
    const end = new Date();

    const diaSemana = daysOfWeek.find(
      (dia) => dia.getDay() === getDayIndex(horario.Dia_semana)
    );
    if (diaSemana) {
      start.setDate(diaSemana.getDate());
      end.setDate(diaSemana.getDate());
    }

    const arrayStart = horario.Hora_entrada.split(":");
    const arrayEnd = horario.Hora_salida.split(":");

    start.setHours(
      parseInt(arrayStart[0]),
      parseInt(arrayStart[1]),
      parseInt(arrayStart[2])
    );
    end.setHours(
      parseInt(arrayEnd[0]),
      parseInt(arrayEnd[1]),
      parseInt(arrayEnd[2])
    );

    events.push({
      title: horario.Carne + " - " + horario.Nombre + " " + horario.Apellido,
      start: start,
      end: end,
    });
  });

  return events;
}
