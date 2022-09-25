import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User } from '../../types/basic';
import { PURGE } from 'redux-persist';

export interface UserReducer {
  user: null | User;
  token: string;
  isLoggedIn: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}

const initialState: UserReducer = {
  user: null,
  token: '',
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

//회원가입
export const register = createAsyncThunk<string, User, { rejectValue: string }>(
  //action name
  'user/register',
  //callback function
  async (userData: User, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API_BASE_URL + '/join',
        userData,
        { withCredentials: true }
      );
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//로그인
export const login = createAsyncThunk<string, User, { rejectValue: string }>(
  'user/login',
  async (userData: User, { rejectWithValue }) => {
    //callback function
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + '/login',
        userData,
        { withCredentials: true }
      );
      return response.headers.authorization;
    } catch (error: any) {
      if (error.response.data.status) {
        return rejectWithValue('아이디와 비밀번호를 확인하세요');
      } else {
        return rejectWithValue('아이디와 비밀번호를 확인하세요');
      }
    }
  }
);

// 로그인 유저 정보 조회
// export const getUserInfo = createAsyncThunk(
//   'user/getUserInfo',
//   async (_, thunkAPI) => {
//     try {

//     } catch (error: any) {
//       if (error.response.data.status) {
//         return thunkAPI.rejectWithValue(error.response.data.message);
//       } else {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   }
// );

// 회원 정보 수정
export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (token, thunkAPI) => {
    //
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    //pending, fulfilled, rejected
    builder
      .addCase(register.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload); // "회원가입 성공"
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(login.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(PURGE, () => initialState);
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
