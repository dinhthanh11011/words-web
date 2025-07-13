import { createSlice } from '@reduxjs/toolkit';

// Initialize theme from localStorage or default to 'light'
const getInitialTheme = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') ?? 'light';
  }
  return 'light';
};

// Apply theme to DOM
export const applyThemeToDOM = (theme: string) => {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }
};

// Initialize theme on app startup
export const initializeTheme = () => {
  const theme = getInitialTheme();
  applyThemeToDOM(theme);
  return theme;
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: getInitialTheme(),
  },
  reducers: {
    setTheme(state, action) {
      state.value = action.payload;
      applyThemeToDOM(action.payload);
    },
    toggleTheme(state) {
      const newTheme = state.value === 'dark' ? 'light' : 'dark';
      state.value = newTheme;
      applyThemeToDOM(newTheme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
