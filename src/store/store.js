import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
