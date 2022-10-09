import { RootState, store } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface CalendarItem {
  bookId: number;
  readEndDate: string;
  cover: string;
}
interface statReducer {
  calendarList: CalendarItem[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}

const initialState: statReducer = {
  calendarList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

//calender data get 요청
export const getCalendarData = createAsyncThunk(
  'stat/getCalendarData',
  async (pageNumber: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { token } = state.user;
      const { data } = await axios.get(
        process.env.REACT_APP_API_BASE_URL + '/books/calender',
        {
          headers: {
            Authorization: token,
          },
          params: {
            page: pageNumber,
            size: 30,
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error.response.data.status) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
    dateTransform: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendarData.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getCalendarData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.calendarList = action.payload.item;
        // console.log(action.payload);
      })
      .addCase(
        getCalendarData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          toast.error(action.payload);
        }
      );
  },
});

export default statSlice.reducer;
