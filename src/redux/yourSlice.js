// src/yourSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const yourSlice = createSlice({
  name: 'yourFeature',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = yourSlice.actions;

export default yourSlice.reducer;
