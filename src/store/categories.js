import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCategories } from "../services/category";

const initialState = { categories: [], count: 0 };

const sortCategories = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
};

export const getCategries = createAsyncThunk("FETCH_CATEGORIES", async () => {
  const response = await fetchAllCategories();
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
    [getCategries.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
export const { addNewCategory } = categoriesSlice.actions;
