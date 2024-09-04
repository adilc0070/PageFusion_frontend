import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/slice';

export const store = configureStore({
    reducer: {
        user: userSlice
    },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;
