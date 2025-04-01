import { useEffect, useState } from "react";
import { getReporteHorasGlobal } from "../services";
import TablaMarcaciones from "./TablaMarcaciones";
import TablaFechas from "./TablaFechas";

export default function ReporteHorasGlobal() {
  const [marcaciones, setMarcaciones] = useState([]);
  const [horasFechas, setHorasFechas] = useState([]);

  useEffect(() => {
    getReporteHorasGlobal().then((res) => {
      if (res.status === 200) {
        setMarcaciones(res.marcaciones);
        setHorasFechas(res.horas_por_fecha);
      }
    });
  }, []);

  return (
    <>
      <TablaMarcaciones marcaciones={marcaciones} />
      <TablaFechas horasFechas={horasFechas} />
    </>
  );
}
