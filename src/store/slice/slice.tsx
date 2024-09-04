import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for state and actions
interface UserState {
    email: string;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    email: '',
    isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<string>) => {
        state.email = action.payload;
        state.isAuthenticated = true;
    },
    setUserLogout: (state) => {
        state.email = '';
        state.isAuthenticated = false;
    }
  }
});

export const { setUserLogin, setUserLogout } = userSlice.actions;

export default userSlice.reducer;
