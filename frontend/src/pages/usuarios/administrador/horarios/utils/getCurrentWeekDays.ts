// Obtener los dias de la semana actual
export default function getCurrentWeekDays() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const daysOfWeek = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(currentDate);
    day.setDate(currentDate.getDate() - currentDay + i);
    daysOfWeek.push(day);
  }

  return daysOfWeek;
}
