// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import specialtiesReducer from './reducers/specialtiesReducer';

export const store = configureStore({
  reducer: {
    yourFeature: specialtiesReducer,
  },
});
