import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCategories } from "../services/category";

const initialState = { categories: [], count: 0, loading: false,error: null };

const sortCategories = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
};

export const getCategries = createAsyncThunk("FETCH_CATEGORIES", async (page) => {
  const response = await fetchAllCategories(page);
  const data = await response.data.categories;
  return data.sort(sortCategories);
});

const categoriesSlice = createSlice({
  name: "cateories",
  initialState,
  reducers: {
    addNewCategory: (state, action) => {
      state.categories = state.categories
        .concat(action.payload.category)
        .sort(sortCategories);
    },
  },
  extraReducers: {
    [getCategries.pending]: (state) => {
      state.loading = true;
    },
    [getCategries.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    [getCategries.rejected]: (state) => {
      state.loading = false,
      state.error = 'Something went wrong, Please try again'
    }
  },
});

export default categoriesSlice.reducer;
export const { addNewCategory } = categoriesSlice.actions;
