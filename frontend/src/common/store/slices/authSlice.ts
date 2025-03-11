import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "@pages/login/interfaces/Auth";

const initialState: Auth = (() => {
  const authFromSessiónStorage = sessionStorage.getItem("_lab014_user");
  if (authFromSessiónStorage) return JSON.parse(authFromSessiónStorage);
  return {
    carne: "",
    rol: 0,
    token: "",
  };
})();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthReducer(state, action: PayloadAction<Auth>) {
      sessionStorage.setItem("_lab014_user", JSON.stringify(action.payload));
      state = action.payload;
    },

    deleteAuthReducer(state) {
      sessionStorage.removeItem("_lab014_user");
      state = {
        carne: "",
        rol: 0,
        token: "",
      };
    },
  },
});

export default authSlice.reducer;
export const { setAuthReducer, deleteAuthReducer } = authSlice.actions;
