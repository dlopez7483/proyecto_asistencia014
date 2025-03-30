// Retonar Indice de dia en base al nombre del dia
export default function getDayIndex(dia: string) {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  return dias.indexOf(dia);
}
