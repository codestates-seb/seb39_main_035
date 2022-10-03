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

interface MemoCreateRequest {
  memoData: Memo;
  bookId: number;
}

interface MemoEditRequest {
  memoData: Memo;
  memoId: number;
}

const initialState: MemoReducer = {
  memo: {
    memoId: 0,
    memoBookPage: 0,
    memoType: '',
    memoContent: '',
    createdAt: '',
    updatedAt: '',
  },
  memoList: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

//메모 등록하기
export const createMemo = createAsyncThunk(
  'memo/create',
  async (memorequest: MemoCreateRequest, thunkAPI) => {
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

//메모 삭제하기
export const deleteMemo = createAsyncThunk(
  'memo/delete',
  async (memoId: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      const { data } = await axios.delete(
        process.env.REACT_APP_API_BASE_URL + `/memos/${memoId}`,
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

//메모 수정하기하기
export const editMemo = createAsyncThunk(
  'memo/edit',
  async (memo: MemoEditRequest, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      const { data } = await axios.patch(
        process.env.REACT_APP_API_BASE_URL + `/memos/${memo.memoId}`,
        memo.memoData,
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

//랜덤 메모 조회
export const getRandomMemo = createAsyncThunk(
  'memo/getRandomMemo',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      const { data } = await axios.patch(
        process.env.REACT_APP_API_BASE_URL + 'memos/random',
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
      })
      .addCase(deleteMemo.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(deleteMemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteMemo.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(editMemo.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(editMemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editMemo.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(getRandomMemo.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getRandomMemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memo = action.payload;
      })
      .addCase(getRandomMemo.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      });
  },
});

export const { reset } = memoSlice.actions;
export default memoSlice.reducer;
