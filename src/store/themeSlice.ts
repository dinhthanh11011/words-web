import { createSlice } from '@reduxjs/toolkit';

const initialTheme = typeof window !== 'undefined'
  ? localStorage.getItem('theme') || 'light'
  : 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: initialTheme,
  },
  reducers: {
    setTheme(state, action) {
      state.value = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(action.payload);
      }
    },
    toggleTheme(state) {
      const newTheme = state.value === 'dark' ? 'light' : 'dark';
      state.value = newTheme;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
