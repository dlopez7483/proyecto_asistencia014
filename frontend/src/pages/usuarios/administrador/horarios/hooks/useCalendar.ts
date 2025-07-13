import React from "react";
import { getAllSchedules } from "../services";
import { formatDate } from "../utils";
import { FormatEventC } from "@common/interfaces/CalendarEvents";

export const useCalendar = () => {
  const [horarios, setHorarios] = React.useState<FormatEventC[]>([]);

  React.useEffect(() => {
    getAllSchedules().then((response) => {
      setHorarios(formatDate(response.horarios));
    });
  }, []);

  return {
    horarios,
  };
};
