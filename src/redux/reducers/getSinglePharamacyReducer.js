import {
  FETCH_SINGLE_PHARAMACY_REQUEST,
  FETCH_SINGLE_PHARAMACY_SUCCESS,
  FETCH_SINGLE_PHARAMACY_FAILURE
  } from '../Actions/getSindlePharamacy';
  
  const initialState = {
    pharamacy: false,
    status: 'idle',
    error: null,
  };
  
  const singlePharamacyReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SINGLE_PHARAMACY_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_SINGLE_PHARAMACY_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          pharamacy: action.payload,
        };
      case FETCH_SINGLE_PHARAMACY_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default singlePharamacyReducer;
  