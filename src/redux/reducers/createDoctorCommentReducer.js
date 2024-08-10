import {
  FETCH_SINGLE_CREATE_COMMENTS_REQUEST,
    FETCH_SINGLE_CREATE_COMMENTS_SUCCESS,
    FETCH_SINGLE_CREATE_COMMENTS_FAILURE
  } from '../Actions/createComment';
  
  const initialState = {
    doctor: {},
    status: 'idle',
    error: null,
  };
  
  const createDoctorCommentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SINGLE_CREATE_COMMENTS_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_SINGLE_CREATE_COMMENTS_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          doctor: action.payload,
        };
      case FETCH_SINGLE_CREATE_COMMENTS_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default createDoctorCommentReducer;
  