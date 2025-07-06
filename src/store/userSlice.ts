import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '@/api/user';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await userApi.getUserInfo();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialToken =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: null,
    loading: false,
    error: null,
    token: initialToken,
  },
  reducers: {
    setUser(state, action) {
      state.info = action.payload;
    },
    clearUser(state) {
      state.info = null;
      state.token = null;
    },
    setToken(state, action) {
      state.token = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload);
      }
    },
    clearToken(state) {
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.info = null;
      });
  },
});

export const { setUser, clearUser, setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
