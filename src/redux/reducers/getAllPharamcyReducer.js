import {
  FETCH_ALL_PHARAMCY_REQUEST,
    FETCH_ALL_PHARAMCY_SUCCESS,
    FETCH_ALL_PHARAMCY_FAILURE
  } from '../Actions/getAllPharmacy';
  
  const initialState = {
    pharamcies: [],
    status: 'idle',
    error: null,
  };
  
  const getAllPharamcyReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_PHARAMCY_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_ALL_PHARAMCY_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          pharamcies: action.payload,
        };
      case FETCH_ALL_PHARAMCY_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default getAllPharamcyReducer;
  