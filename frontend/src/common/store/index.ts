import authSlice from '@common/store/slices/authSlice';
import usersSlice from '@common/store/slices/usersSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        users: usersSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()   
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;