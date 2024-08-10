// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import specialtiesReducer from './reducers/specialtiesReducer';
import doctorSpecialtiesReducer from './reducers/doctorspecialtiesReducer';
import singleDoctorReducer from './reducers/getSingleDoctorReducer';
import singleDoctorCommentsReducer from './reducers/getSingleDoctorCommentsReducer';
import createDoctorCommentReducer from './reducers/createDoctorCommentReducer';
import authReducer from './reducers/loginReducer';
import userReducer from './reducers/registerReducer';


export const store = configureStore({
  reducer: {
    yourFeature: specialtiesReducer,
    doctor_specfic:doctorSpecialtiesReducer,
    singlr_doc:singleDoctorReducer,
    single_comments:singleDoctorCommentsReducer,
    create_comment:createDoctorCommentReducer,
    login_auth:authReducer,
    register_auth:userReducer
  },
});
