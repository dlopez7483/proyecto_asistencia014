import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@common/interfaces/User";

interface TutorState {
  tutores: User[];
  currentTutor: User;
}

const initialState: TutorState = {
  tutores: [],
  currentTutor: {
    Id_auxiliar: 0,
    Nombre: "",
    Apellido: "",
    Carne: "",
    Telefono: "",
    Contrasenia: "",
    Id_rol: 0,
  },
};

const userSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    setTutoresReducer(state, action: PayloadAction<User[]>) {
      state.tutores = action.payload;
    },
    updateTutorReducer(state, action: PayloadAction<User>) {
      const index = state.tutores.findIndex(
        (tutor) => tutor.Id_auxiliar === action.payload.Id_auxiliar
      );
      state.tutores[index] = {...state.tutores[index], ...action.payload};
    },
    deleteTutorReducer(state, action: PayloadAction<User>) {
      state.tutores = state.tutores.filter(
        (tutor) => tutor.Id_auxiliar !== action.payload.Id_auxiliar
      );
    },
    restTutoresReducer(state) {
      state.tutores = [];
    },
    rollbackFromDeleteTutoresReducer(state, action: PayloadAction<User>) {
      const isUserAlredyDefined = state.tutores.some(
        (tutor) => tutor.Id_auxiliar === action.payload.Id_auxiliar
      );
      if (!isUserAlredyDefined) state.tutores.push(action.payload);
    },
    rollbackFromUpdateTutoresReducer(state, action: PayloadAction<User>) {
      const index = state.tutores.findIndex(
        (tutor) => tutor.Id_auxiliar === action.payload.Id_auxiliar
      );
      state.tutores[index] = action.payload;
    },
    setCurrentUserReducer(state, action: PayloadAction<User>) {
      state.currentTutor = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  setTutoresReducer,
  updateTutorReducer,
  deleteTutorReducer,
  restTutoresReducer,
  rollbackFromDeleteTutoresReducer,
  rollbackFromUpdateTutoresReducer,
  setCurrentUserReducer,
} = userSlice.actions;
