import {
  FETCH_ALL_DOCTORS_REQUEST,
    FETCH_ALL_DOCTORS_SUCCESS,
    FETCH_ALL_DOCTORS_FAILURE
  } from '../Actions/getAllDoctors';
  
  const initialState = {
    doctors: [],
    status: 'idle',
    error: null,
  };
  
  const getAllDoctorReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_DOCTORS_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_ALL_DOCTORS_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          doctors: action.payload,
        };
      case FETCH_ALL_DOCTORS_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default getAllDoctorReducer;
  