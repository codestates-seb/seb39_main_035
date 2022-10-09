import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BookDetailResponse, Books } from '../../types/basic';
import { EditBookDetail } from '../../types/basic';

export interface BookReducer {
  book: Books;
  bookDetail: BookDetailResponse;
  editBookDetail: EditBookDetail;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}
const initialState: BookReducer = {
  book: {
    title: '',
    author: '',
    cover: '',
    publisher: '',
    itemPage: 0,
    currentPage: 0,
    bookStatus: '',
    readStartDate: null,
    readEndDate: null,
  },
  bookDetail: {
    bookId: 0,
    title: '',
    cover: '',
    author: '',
    publisher: '',
    createdAt: '',
    star: 0,
    currentPage: 0,
    itemPage: 0,
    bookStatus: '',
    readStartDate: null,
    readEndDate: null,
    memosList: [],
    memoCount: 0,
  },
  editBookDetail: {
    author: '',
    itemPage: 0,
    currentPage: 0,
    publisher: '',
    bookStatus: '',
    readStartDate: null,
    readEndDate: null,
    star: 0,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// 책 등록하기
export const register = createAsyncThunk(
  //action name
  'book/register',
  //callback function`
  async (bookData: Books, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
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

// 책 상세페이지 조회
export const getBookDetailData = createAsyncThunk<
  BookDetailResponse,
  string | undefined,
  { rejectValue: string }
>(
  //action name
  'books/bookDetailData',
  //callback function
  async (bookId, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      const { data } = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/books/${bookId}`,
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

// 책 상세 페이지 수정
export const editBookDetail = createAsyncThunk(
  //action name
  'books/editBookDetailData',
  //callback function
  async (editBookDetailData: EditBookDetail, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      const { data } = await axios.patch(
        process.env.REACT_APP_API_BASE_URL +
          `/books/${editBookDetailData.bookId}`,
        editBookDetailData,
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
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    //pending, fulfilled, rejected
    builder
      .addCase(register.pending, (state, _) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('📖 책 등록에 성공했어요.'); // "책 등록 성공"
        state.book = { ...action.payload };
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload);
      })
      .addCase(getBookDetailData.pending, (state, _) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getBookDetailData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bookDetail = { ...action.payload };
      })
      .addCase(
        getBookDetailData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          toast.error(action.payload);
        }
      )
      .addCase(editBookDetail.pending, (state, _) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(editBookDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.editBookDetail = { ...action.payload };
        state.bookDetail = { ...state.bookDetail, ...action.payload };
      })
      .addCase(editBookDetail.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload);
      });
  },
});
export const { reset } = bookSlice.actions;
export default bookSlice.reducer;
