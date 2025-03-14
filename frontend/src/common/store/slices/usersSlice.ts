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
    setNewTutorReducer(state, action: PayloadAction<User>) {
      state.tutores.push(action.payload);
    },
    updateTutorReducer(state, action: PayloadAction<User>) {
      const index = state.tutores.findIndex(
        (tutor) => tutor.Id_auxiliar === action.payload.Id_auxiliar
      );
      state.tutores[index] = action.payload;
    },
    deleteTutorReducer(state, action: PayloadAction<number>) {
      state.tutores = state.tutores.filter(
        (tutor) => tutor.Id_auxiliar !== action.payload
      );
    },
    restTutoresReducer(state) {
      state.tutores = [];
    },
  },
});

export default userSlice.reducer;
export const {
  setTutoresReducer,
  setNewTutorReducer,
  updateTutorReducer,
  deleteTutorReducer,
  restTutoresReducer,
} = userSlice.actions;
