import { BtnPeriodoHorarios, MyCalendar } from "./components";
import BtnExtemporaneo from "./components/BtnExtemporaneo";


export default function AdminHorarios() {
  return (
    <div>
      <BtnPeriodoHorarios />
      <BtnExtemporaneo />
      <MyCalendar />
    </div>
  );
}
