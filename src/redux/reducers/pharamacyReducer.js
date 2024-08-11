import {
  PHARAMACY_REQUEST,
    PHARAMACY_SUCCESS,
    PHARAMACY_FAILURE
  } from '../Actions/pharamacyActions';
  
  const initialState = {
    pharamacy: [],
    status: 'idle',
    error: null,
  };
  
  const PharamacyReducer = (state = initialState, action) => {
    switch (action.type) {
      case PHARAMACY_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case PHARAMACY_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          pharamacy: action.payload,
        };
      case PHARAMACY_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default PharamacyReducer;
  