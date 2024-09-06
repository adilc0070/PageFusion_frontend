import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/slice';

export const store = configureStore({
    reducer: {
        user: userSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
