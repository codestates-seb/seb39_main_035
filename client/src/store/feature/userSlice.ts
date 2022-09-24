import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

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
  },
  // 초기화하고 싶은 state가 있는 slice마다 아래를 추가한다.
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { loginAccount } = userSlice.actions;
export default userSlice.reducer;
