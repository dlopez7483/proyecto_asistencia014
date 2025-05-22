import { Middleware } from "@reduxjs/toolkit";
import { updateTutor, deleteTutor } from "../services";
import {
  rollbackFromDeleteTutoresReducer,
  rollbackFromUpdateTutoresReducer,
} from "../slices/usersSlice";
import { User } from "@common/interfaces/User";
import Swal from "sweetalert2";

export const SyncDB: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action;
  const previousState = store.getState();
  next(action);

  if (type === "tutor/updateTutorReducer") {
    console.log(payload)
    const tutorToUpdate: Map<string, string | number> = new Map();
    if (payload.Nombre) tutorToUpdate.set("nombre", payload.Nombre);
    if (payload.Apellido) tutorToUpdate.set("apellido", payload.Apellido);
    if (payload.Carne) tutorToUpdate.set("carne_nuevo", payload.Carne);
    if (payload.Telefono) tutorToUpdate.set("telefono", payload.Telefono);
    if (payload.Codigo_RFID)
      tutorToUpdate.set("codigo_rfid", payload.Codigo_RFID);
    if (payload.Contrasenia) tutorToUpdate.set("contrasenia", payload.Contrasenia);
    console.log(tutorToUpdate)

    updateTutor(tutorToUpdate, payload.Id_auxiliar).then((response) => {
      if (response.status !== 200) {
        const prevTutor = previousState.tutores.tutores.find(
          (tutor: User) => tutor.Id_auxiliar === payload.Id_auxiliar
        );
        store.dispatch(rollbackFromUpdateTutoresReducer(prevTutor));
      }
    });
  } else if (type === "tutor/deleteTutorReducer") {
    deleteTutor(payload.Carne).then((response) => {
      if (response.status !== 200) {
        const previousTutores = previousState.tutores.tutores;
        const tutorToDelete = previousTutores.find(
          (tutor: User) => tutor.Id_auxiliar === payload.Id_auxiliar
        );
        store.dispatch(rollbackFromDeleteTutoresReducer(tutorToDelete));
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el tutor de la base de datos",
          showConfirmButton: true,
        });
      }
    });
  }
};
