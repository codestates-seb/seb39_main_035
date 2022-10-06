import { createSlice } from '@reduxjs/toolkit';

interface DarkMode {
  colors: {
    bg: string;
    font: string;
    icons: string;
    boxShadow: string;
    border: string;
  };
  darkmode: boolean;
}

const initialState: DarkMode = {
  colors: {
    bg: '#f9f9f9',
    font: '#747474',
    icons: '#b3dbd8',
    boxShadow: '0 4px 6px rgb(32 33 36 / 10%)',
    border: '1px solid rgba(32 33 36 / 20%)',
  },
  darkmode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkTheme(state) {
      state.colors.bg = '#181818';
      state.colors.font = '#f9f9f9';
      state.colors.icons = ' #FFBFC5';
      state.colors.boxShadow = '0 4px 6px rgba(255 255 255 / 20%)';
      state.colors.border = '1px solid rgba(255 255 255 / 20%)';
      state.darkmode = true;
    },
    setDefaultTheme(state) {
      state.colors.font = '#747474';
      state.colors.bg = '#f9f9f9';
      state.colors.icons = '#b3dbd8';
      state.colors.boxShadow = '0 4px 6px rgba(32 33 36 / 20%)';
      state.colors.border = '1px solid rgba(32 33 36 / 20%)';
      state.darkmode = false;
    },
  },
});

export const { setDarkTheme, setDefaultTheme } = themeSlice.actions;
export default themeSlice.reducer;
