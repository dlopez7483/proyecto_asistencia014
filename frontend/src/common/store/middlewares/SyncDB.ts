import { Middleware } from "@reduxjs/toolkit";
import { updateTutor } from "../services/updateTutor";
import { rollbackFromUpdateTutoresReducer } from "../slices/usersSlice";
import { User } from "@common/interfaces/User";

export const SyncDB: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action;
  const previousState = store.getState();
  next(action);

  if (type === "tutor/updateTutorReducer") {
    const tutorToUpdate: Map<string, string | number> = new Map();
    if (payload.Nombre) tutorToUpdate.set("nombre", payload.Nombre);
    if (payload.Apellido) tutorToUpdate.set("apellido", payload.Apellido);
    if (payload.Carne) tutorToUpdate.set("carne_nuevo", payload.Carne);
    if (payload.Telefono) tutorToUpdate.set("telefono", payload.Telefono);
    if (payload.Codigo_RFID) tutorToUpdate.set("codigo_rfid", payload.Codigo_RFID);
    if (payload.Password) tutorToUpdate.set("contrasenia", payload.Password);

    updateTutor(tutorToUpdate,payload.Id_auxiliar).then((response) => {
      console.log(previousState);
      if (response.status !== 200) {
        const prevTutor = previousState.tutores.tutores.find(
          (tutor: User) => tutor.Id_auxiliar === payload.Id_auxiliar
        );
        store.dispatch(rollbackFromUpdateTutoresReducer(prevTutor));
      }
    });
  }
};
