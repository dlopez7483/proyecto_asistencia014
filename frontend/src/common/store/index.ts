
import { configureStore } from "@reduxjs/toolkit";
import { SyncDB } from "@common/store/middlewares/SyncDB";
import authSlice from "./slices/authSlice";
import usersSlice from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tutores: usersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(SyncDB),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
