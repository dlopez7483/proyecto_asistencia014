import { useEffect, useState } from "react";
import { getAllSchedules } from "../services";
import { formatDate  } from "../utils";
import { FormatEventC } from "@common/interfaces/CalendarEvents";

export default function useCalendar() {
  const [horarios, setHorarios] = useState<FormatEventC[]>([]);

  useEffect(() => {
    getAllSchedules().then((response) => {
      console.log("horarios", response.horarios);
      setHorarios(formatDate(response.horarios));
    });
  }, []);

  return {
    horarios,
  };
}
