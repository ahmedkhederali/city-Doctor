import {
  FETCH_SINGLE_MEDICALLAB_REQUEST,
    FETCH_SINGLE_MEDICALLAB_SUCCESS,
    FETCH_SINGLE_MEDICALLAB_FAILURE
  } from '../Actions/getSindleMedicalLab';
  
  const initialState = {
    medicalLabsData: {},
    status: 'idle',
    error: null,
  };
  
  const singleMedicalLabReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SINGLE_MEDICALLAB_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_SINGLE_MEDICALLAB_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          medicalLabsData: action.payload,
        };
      case FETCH_SINGLE_MEDICALLAB_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default singleMedicalLabReducer;
  