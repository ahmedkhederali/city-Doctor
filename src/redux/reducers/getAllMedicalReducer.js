import {
  FETCH_ALL_MEDICALLAB_REQUEST,
    FETCH_ALL_MEDICALLAB_SUCCESS,
    FETCH_ALL_MEDICALLAB_FAILURE
  } from '../Actions/getAllMedicalLab';
  
  const initialState = {
    medicalLabs: [],
    status: 'idle',
    error: null,
  };
  
  const getAllMedicalReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_MEDICALLAB_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_ALL_MEDICALLAB_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          medicalLabs: action.payload,
        };
      case FETCH_ALL_MEDICALLAB_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default getAllMedicalReducer;
  