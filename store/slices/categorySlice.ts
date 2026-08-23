import { api } from "@/lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Category = {
  id: string;
  name: string;
};

type CategoryState = {
  items: Category[];
  loading: boolean;
  error: string | null;
};

const initialState: CategoryState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  return await api.get<Category[]>("/categories");
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "خطا در دریافت دسته‌بندی‌ها";
      });
  },
});

export default categorySlice.reducer;