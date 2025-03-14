import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "@common/interfaces/Auth";
import { config } from "@config/config";

const initialState: Auth = (() => {
  const authFromSessiónStorage = sessionStorage.getItem(config.SESSION_AUTH);
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
      sessionStorage.setItem(
        config.SESSION_AUTH,
        JSON.stringify(action.payload)
      );
      state = action.payload;
    },

    deleteAuthReducer(state) {
      window.sessionStorage.clear();
      window.location.href = "/"
      state.carne = "";
      state.rol = 0;
      state.token = "";
    },
  },
});

export default authSlice.reducer;
export const { setAuthReducer, deleteAuthReducer } = authSlice.actions;
