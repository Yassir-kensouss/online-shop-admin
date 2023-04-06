import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newOrdersCount: [],
}

const ordersSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        increaseOrdersCount: (state, action) => {
            state.newOrdersCount = state.newOrdersCount.concat(action.payload)
        },
        resetOrdersCount: (state, action) => {
            state.newOrdersCount = []
        }
    }
});

export default ordersSlice.reducer;
export const { increaseOrdersCount, resetOrdersCount } = ordersSlice.actions;