// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import specialtiesReducer from './reducers/specialtiesReducer';
import doctorSpecialtiesReducer from './reducers/doctorspecialtiesReducer';
import singleDoctorReducer from './reducers/getSingleDoctorReducer';
import singleDoctorCommentsReducer from './reducers/getSingleDoctorCommentsReducer';
import createDoctorCommentReducer from './reducers/createDoctorCommentReducer';
import authReducer from './reducers/loginReducer';
import userReducer from './reducers/registerReducer';
import medicalLabsReducer from './reducers/medicalLabsReducer';
import singleMedicalLabReducer from './reducers/getSingleMedicalLabReducer';
import medicalLabReducer from './reducers/RatingMedicalLabsReducer';
import PharamacyReducer from './reducers/pharamacyReducer';
import singlePharamacyReducer from './reducers/getSinglePharamacyReducer';
import singlePharamcyCommentsReducer from './reducers/getSinglePharamcyCommentsReducer';
import singleMedicalLabCommentsReducer from './reducers/getSingleMedicalLabCommentsReducer';
import nursingReducer from './reducers/nursingReducer';
import singleNursingReducer from './reducers/getSingleNursingReducer';
import singleNursingCommentsReducer from './reducers/getSingleNursingCommentsReducer';
import nursingRateReducer from './reducers/RatingNursingReducer';


export const store = configureStore({
  reducer: {
    yourFeature: specialtiesReducer,
    doctor_specfic:doctorSpecialtiesReducer,
    singlr_doc:singleDoctorReducer,
    single_comments:singleDoctorCommentsReducer,
    create_comment:createDoctorCommentReducer,
    login_auth:authReducer,
    register_auth:userReducer,
    medical_lab:medicalLabsReducer,
    singlr_medicalLab:singleMedicalLabReducer,
    rate_medicallab:medicalLabReducer,
    pharamacy:PharamacyReducer,
    single_pharamcy:singlePharamacyReducer,
    singlr_pharamcy_comment :singlePharamcyCommentsReducer,
    singlr_medicalLab_comment:singleMedicalLabCommentsReducer,
    all_nursing:nursingReducer,
    single_nursing:singleNursingReducer,
    single_nurse_comment:singleNursingCommentsReducer,
  },
});
