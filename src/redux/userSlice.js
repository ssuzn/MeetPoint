import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: '',
  nickname: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = '';
      state.nickname = '';
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;