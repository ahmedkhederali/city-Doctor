import {
  FETCH_SINGLE_NURSING_REQUEST,
  FETCH_SINGLE_NURSING_SUCCESS,
  FETCH_SINGLE_NURSING_FAILURE
  } from '../Actions/getSindleNursing';
  
  const initialState = {
    nrsing: {},
    status: 'idle',
    error: null,
  };
  
  const singleNursingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SINGLE_NURSING_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_SINGLE_NURSING_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          nrsing: action.payload?.nurse,
        };
      case FETCH_SINGLE_NURSING_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default singleNursingReducer;
  