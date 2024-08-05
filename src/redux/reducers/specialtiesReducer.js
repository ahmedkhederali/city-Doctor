import {
    FETCH_SPECIALTIES_REQUEST,
    FETCH_SPECIALTIES_SUCCESS,
    FETCH_SPECIALTIES_FAILURE
  } from '../Actions/specialActions';
  
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
  };
  
  const specialtiesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SPECIALTIES_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_SPECIALTIES_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          items: action.payload,
        };
      case FETCH_SPECIALTIES_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default specialtiesReducer;
  