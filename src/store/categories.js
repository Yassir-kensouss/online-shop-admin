// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchAllCategories } from "../services/category";

// const initialState = {
//   categories: [],
//   count: 0,
//   loading: false,
//   error: null,
//   perPage: null,
//   pages:[]
// };

// const sortCategories = (a, b) => {
//   return new Date(b.createdAt) - new Date(a.createdAt);
// };

// const categoriesSlice = createSlice({
//   name: "cateories",
//   initialState,
//   reducers: {
//     addNewCategory: (state, action) => {
//       state.categories = state.categories
//         .concat(action.payload.category)
//         .sort(sortCategories);
//     },
//   },
// });

// export default categoriesSlice.reducer;
// export const { addNewCategory } = categoriesSlice.actions;
