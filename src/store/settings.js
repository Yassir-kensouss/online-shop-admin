import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalize: {},
    appearance: {}
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        fetchSettings: (state, action) => {
            state.personalize = {
                brand: action.payload.brand,
                currency: action.payload.currency,
                language: action.payload.language,
            }
        },
        updatePSettings: (state, action) => {
            console.log('action.payload', action.payload)
            state.personalize = {
               ...state.personalize,
               ...action.payload,
            }
        }
    }
})

export default settingsSlice.reducer;
export const {fetchSettings, updatePSettings} = settingsSlice.actions;