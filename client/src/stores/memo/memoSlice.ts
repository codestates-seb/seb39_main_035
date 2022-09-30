import { RootState } from '../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Memo, MemoResponse } from '../../types/basic';
import { toast } from 'react-toastify';

interface MemoReducer {
  memo: MemoResponse;
  memoList: MemoResponse[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface memoRequest {
  memoData: Memo;
  bookId: number;
}

const initialState: MemoReducer = {
  memo: {
    memoId: 0,
    memoBookPage: 0,
    memoType: '',
    memoContent: '',
  },
  memoList: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

//메모 등록하기
export const createMemo = createAsyncThunk(
  'memo/create',
  async (memorequest: memoRequest, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      const { data } = await axios.post(
        process.env.REACT_APP_API_BASE_URL + `/memos/${memorequest.bookId}`,
        memorequest.memoData,
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

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMemo.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(createMemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memo = { ...action.payload };
      })
      .addCase(createMemo.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      });
  },
});
