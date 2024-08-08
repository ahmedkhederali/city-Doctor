// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import specialtiesReducer from './reducers/specialtiesReducer';
import doctorSpecialtiesReducer from './reducers/doctorspecialtiesReducer';


export const store = configureStore({
  reducer: {
    yourFeature: specialtiesReducer,
    doctor_specfic:doctorSpecialtiesReducer
  },
});
