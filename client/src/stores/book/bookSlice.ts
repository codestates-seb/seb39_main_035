import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Books } from '../../types/basic';

export interface BookReducer {
  book: Books;
  token: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}

const initialState: BookReducer = {
  book: {
    title: '',
    author: '',
    cover: '',
    itemPage: 0,
    currentPage: 0,
    publisher: '',
    bookStatus: 'YET',
    readStartDate: null,
    readEndDate: null,
  },
  token: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// 책 등록하기
export const register = createAsyncThunk(
  //action name
  'book/register',
  //callback function
  async (bookData: Books, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      console.log(state);
      const { token } = state.user;
      const { data } = await axios.post(
        process.env.REACT_APP_API_BASE_URL + '/books',
        bookData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const bookSlice = createSlice({
  name: 'book',
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
        toast.success('📖 책 등록에 성공하셨습니다.'); // "책 등록 성공"
        console.log('action:', action);
        console.log('action.payload:', action.payload);
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      });
  },
});

export default bookSlice.reducer;
