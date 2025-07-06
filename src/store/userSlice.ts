import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApis from '@/api/user';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const data = await userApis.getUserInfo();
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.info = action.payload;
    },
    clearUser(state) {
      state.info = null;
    },
  },
  extraReducers: builder => {
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
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer; 