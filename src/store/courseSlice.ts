import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseApi, { Course, Language } from '@/api/course';

interface CourseState {
  courses: Course[];
  languages: Language[];
  selectedLanguage: string;
  loading: boolean;
  error: unknown;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async (params: { page?: number; limit?: number; language?: string } = {}, { rejectWithValue }) => {
    try {
      const data = await courseApi.getCourses(params);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchLanguages = createAsyncThunk(
  'course/fetchLanguages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await courseApi.getLanguages();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState: CourseState = {
  courses: [],
  languages: [],
  selectedLanguage: 'en',
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setSelectedLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
    setPageSize(state, action) {
      state.pagination.limit = action.payload;
      state.pagination.page = 1; // Reset to first page when changing page size
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch languages
      .addCase(fetchLanguages.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSelectedLanguage, setPage, setPageSize } = courseSlice.actions;
export default courseSlice.reducer; 