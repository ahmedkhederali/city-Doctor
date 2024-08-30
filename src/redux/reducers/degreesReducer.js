import {
    FETCH_DEGREE_REQUEST,
    FETCH_DEGREE_SUCCESS,
    FETCH_DEGREE_FAILURE
  } from '../Actions/degreeActions';
  
  const initialState = {
    degrees: [],
    status_degree: 'idle',
    error_degree: null,
  };
  
  const degreesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DEGREE_REQUEST:
        return {
          ...state,
          status_degree: 'loading',
        };
      case FETCH_DEGREE_SUCCESS:
        return {
          ...state,
          status_degree: 'succeeded',
          degrees: action.payload,
        };
      case FETCH_DEGREE_FAILURE:
        return {
          ...state,
          status_degree: 'failed',
          error_degree: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default degreesReducer;
  