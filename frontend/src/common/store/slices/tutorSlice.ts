import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@common/interfaces/User";

interface TutorState {
  tutores: User[];
  currentTutor: User;
}

const initialState: TutorState = {
  tutores: [],
  currentTutor: {
    id_usuario: 0,
    nombre: "",
    apellido: "",
    carne: "",
    telefono: "",
    contrasenia: "",
    rol: 0,
  },
};

const userSlice = createSlice({
  name: "tutores",
  initialState,
  reducers: {
    setTutores(state, action: PayloadAction<User[]>) {
      state.tutores = action.payload;
    },
    setNewTutor(state, action: PayloadAction<User>) {
      state.tutores.push(action.payload);
    },
    updateTutor(state, action: PayloadAction<User>) {
      const index = state.tutores.findIndex(
        (tutor) => tutor.id_usuario === action.payload.id_usuario
      );
      state.tutores[index] = action.payload;
    },
    deleteTutor(state, action: PayloadAction<number>) {
      state.tutores = state.tutores.filter(
        (tutor) => tutor.id_usuario !== action.payload
      );
    },
    restTutores(state) {
      state.tutores = [];
    },
  },
});

export default userSlice.reducer;
