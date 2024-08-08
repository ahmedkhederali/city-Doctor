import {
    FETCH_DOCTOR_SPECIALTIES_REQUEST,
    FETCH_DOCTOR_SPECIALTIES_SUCCESS,
    FETCH_DOCTOR_SPECIALTIES_FAILURE
  } from '../Actions/doctoBasedonSpecialist';
  
  const initialState = {
    items: {},
    status: 'idle',
    error: null,
  };
  
  const specialtiesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DOCTOR_SPECIALTIES_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_DOCTOR_SPECIALTIES_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          items: action.payload,
        };
      case FETCH_DOCTOR_SPECIALTIES_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default specialtiesReducer;
  