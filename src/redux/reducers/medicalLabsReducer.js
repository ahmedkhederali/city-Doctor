import {
    MEDICAL_LAB_REQUEST,
    MEDICAL_LAB_SUCCESS,
    MEDICAL_LAB_FAILURE
  } from '../Actions/medicalLabsActions';
  
  const initialState = {
    medicalLabsData: [],
    status: 'idle',
    error: null,
  };
  
  const medicalLabsReducer = (state = initialState, action) => {
    switch (action.type) {
      case MEDICAL_LAB_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
        case 'CLEAR_MEDICALLABS':
          return {
            ...state,
            medicalLabsData: {
              ...state.medicalLabsData,
              CLEAR_MEDICALLABS: [],
            },
          }; 
      case MEDICAL_LAB_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          medicalLabsData: action.payload,
        };
      case MEDICAL_LAB_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default medicalLabsReducer;
  