import { createSlice } from '@reduxjs/toolkit';
import pinkGradient from '../../assets/pink.png';
import white from '../../assets/white.png';
import aurora from '../../assets/aurora.png';
import starryNight from '../../assets/star5.png';
import sky from '../../assets/sky.png';
import blueGradient from '../../assets/bluegradient.png';

interface imageState {
  imgUrl: string;
  fontColor: string;
}
const initialState: imageState = {
  imgUrl: '',
  fontColor: '',
};

const imageSlice = createSlice({
  name: 'memobg',
  initialState,
  reducers: {
    changeDefault: (state) => {
      state.imgUrl = white;
      state.fontColor = '#222';
    },
    changePink: (state) => {
      state.imgUrl = pinkGradient;
      state.fontColor = '#222';
    },
    changeAurora: (state) => {
      state.imgUrl = aurora;
      state.fontColor = '#f9f9f9';
    },
    changeStar: (state) => {
      state.imgUrl = starryNight;
      state.fontColor = '#f9f9f9';
    },
    changeSky: (state) => {
      state.imgUrl = sky;
      state.fontColor = '#222';
    },
    changeBlue: (state) => {
      state.imgUrl = blueGradient;
      state.fontColor = '#f9f9f9';
    },
  },
});

export const {
  changePink,
  changeDefault,
  changeAurora,
  changeStar,
  changeSky,
  changeBlue,
} = imageSlice.actions;
export default imageSlice.reducer;
