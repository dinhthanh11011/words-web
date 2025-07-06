import courseApi, { Course, Language } from '@/api/course';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CourseState {
  courses: Course[];
  languages: Language[];
  selectedLanguage: Language | null;
  loading: boolean;
  error: unknown;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  languagePagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async (
    params: { page?: number; limit?: number; languageId?: number, userId?: number } | undefined,
    { rejectWithValue }
  ) => {
    const safeParams = params ?? {};
    try {
      const data = await courseApi.getCourses(safeParams);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchLanguages = createAsyncThunk(
  'course/fetchLanguages',
  async (
    params: { page?: number; limit?: number } | undefined,
    { rejectWithValue }
  ) => {
    const safeParams = params ?? {};
    try {
      const data = await courseApi.getLanguages(safeParams);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState: CourseState = {
  courses: [],
  languages: [],
  selectedLanguage: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
  languagePagination: {
    page: 1,
    pageSize: 10,
    total: 0,
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
    setLanguagePage(state, action) {
      state.languagePagination.page = action.payload;
    },
    setLanguagePageSize(state, action) {
      state.languagePagination.pageSize = action.payload;
      state.languagePagination.page = 1; // Reset to first page when changing page size
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
        state.courses = action.payload.items;
        state.pagination.total = action.payload.total;
        state.pagination.totalPages = Math.ceil(
          action.payload.total / state.pagination.limit
        );
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
        state.languages = action.payload.items;
        state.languagePagination.total = action.payload.total;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedLanguage,
  setPage,
  setPageSize,
  setLanguagePage,
  setLanguagePageSize,
} = courseSlice.actions;
export default courseSlice.reducer;
