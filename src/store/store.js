import { configureStore } from "@reduxjs/toolkit";
import settingsReducers from "./settings";
import ordersReducers from './orders'

export const store = configureStore({
  reducer: {
    settings: settingsReducers,
    orders: ordersReducers
  },
});
