import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import ordersReducers from './orders'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    orders: ordersReducers
  },
});
