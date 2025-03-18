import authSlice from "@common/store/slices/authSlice";
import usersSlice from "@common/store/slices/usersSlice";
import { configureStore } from "@reduxjs/toolkit";
import { SyncDB } from "@common/store/middlewares/SyncDB";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tutores: usersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(SyncDB),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
