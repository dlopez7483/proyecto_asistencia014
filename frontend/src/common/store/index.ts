import authSlice from '@common/store/slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()   
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;