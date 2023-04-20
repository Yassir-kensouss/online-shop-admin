import { createSlice } from "@reduxjs/toolkit";

const localStorageMode = localStorage.getItem("mode");

const initialState = {
  personalize: {},
  appearance: {
    mode: localStorageMode,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    fetchSettings: (state, action) => {
      state.personalize = {
        brand: action.payload.brand,
        currency: action.payload.currency,
        language: action.payload.language,
      };
    },
    updatePSettings: (state, action) => {
      state.personalize = {
        ...state.personalize,
        ...action.payload,
      };
    },
    updateApSettings: (state, action) => {
      state.appearance = {
        ...state.appearance,
        ...action.payload,
      };
    },
  },
});

export default settingsSlice.reducer;
export const { fetchSettings, updatePSettings, updateApSettings } =
  settingsSlice.actions;
