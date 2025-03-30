import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

import "react-big-calendar/lib/css/react-big-calendar.css";
import useCalendar from "../hooks/useCalendar";

export default function MyCalendar() {
  const localizer = dayjsLocalizer(dayjs);
  const { horarios } = useCalendar();

  return (
    <div style={{ height: "500px", padding: "10px" }}>
      <Calendar
        localizer={localizer}
        events={horarios}
        startAccessor="start"
        endAccessor="end"
        views={["week", "day"]}
        defaultView="week"
      />
    </div>
  );
}
