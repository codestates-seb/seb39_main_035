import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Authorization: '',
  email: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAccount: (state, action) => {
      state.Authorization = action.payload.Authorization;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logoutAccount: (state) => {
      state.Authorization = '';
      state.email = '';
      state.password = '';
    },
  },
});

export const { loginAccount, logoutAccount } = userSlice.actions;
export default userSlice.reducer;
