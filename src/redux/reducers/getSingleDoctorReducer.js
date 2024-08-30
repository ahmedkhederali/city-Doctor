import {
  FETCH_SINGLE_DOCTOR_REQUEST,
    FETCH_SINGLE_DOCTOR_SUCCESS,
    FETCH_SINGLE_DOCTOR_FAILURE
  } from '../Actions/getSindleDoctor';
  
  const initialState = {
    doctor: {},
    status: 'idle',
    error: null,
  };
  
  const singleDoctorReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SINGLE_DOCTOR_REQUEST:
        return {
          ...state,
          status: 'loading',
          doctor:{}
        };
      case FETCH_SINGLE_DOCTOR_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          doctor: action.payload,
        };
      case FETCH_SINGLE_DOCTOR_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default singleDoctorReducer;
  