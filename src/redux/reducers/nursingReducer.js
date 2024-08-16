import {
    NURSING_REQUEST,
    NURSING_SUCCESS,
    NURSING_FAILURE
  } from '../Actions/nursingActions';
  
  const initialState = {
    nursingData: [],
    status: 'idle',
    error: null,
  };
  
  const nursingReducer = (state = initialState, action) => {
    switch (action.type) {
      case NURSING_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
        case 'CLEAR_MEDICALLABS':
          return {
            ...state,
            nursingData: {
              ...state.nursingData,
              CLEAR_MEDICALLABS: [],
            },
          }; 
      case NURSING_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          nursingData: action.payload?.nurses,
        };
      case NURSING_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default nursingReducer;
  