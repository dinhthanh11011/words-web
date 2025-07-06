import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '@/api/user';

interface UserState {
  info: { name: string; email?: string; image?: string } | null;
  loading: boolean;
  initializing: boolean;
  error: unknown;
  token: string | null;
}

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

const initialState: UserState = {
  info: null,
  loading: false,
  initializing: true,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.info = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      }
    },
    clearUser(state) {
      state.info = null;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userInfo');
      }
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
    initializeFromStorage(state) {
      if (typeof window !== 'undefined') {
        const storedUserInfo = localStorage.getItem('userInfo');
        const storedToken = localStorage.getItem('token');
        
        if (storedUserInfo) {
          try {
            state.info = JSON.parse(storedUserInfo);
          } catch (error) {
            console.error('Failed to parse stored user info:', error);
            localStorage.removeItem('userInfo');
          }
        }
        
        if (storedToken) {
          state.token = storedToken;
        }
      }
      state.initializing = false;
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
        if (typeof window !== 'undefined') {
          localStorage.setItem('userInfo', JSON.stringify(action.payload));
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.info = null;
      });
  },
});

export const { setUser, clearUser, setToken, clearToken, initializeFromStorage } =
  userSlice.actions;
export default userSlice.reducer;
