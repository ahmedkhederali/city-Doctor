// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import specialtiesReducer from './reducers/specialtiesReducer';
import doctorSpecialtiesReducer from './reducers/doctorspecialtiesReducer';
import singleDoctorReducer from './reducers/getSingleDoctorReducer';
import singleDoctorCommentsReducer from './reducers/getSingleDoctorCommentsReducer';


export const store = configureStore({
  reducer: {
    yourFeature: specialtiesReducer,
    doctor_specfic:doctorSpecialtiesReducer,
    singlr_doc:singleDoctorReducer,
    single_comments:singleDoctorCommentsReducer
  },
});
