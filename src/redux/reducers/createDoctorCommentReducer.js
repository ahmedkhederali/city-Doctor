import {
  FETCH_SINGLE_CREATE_COMMENTS_REQUEST,
    FETCH_SINGLE_CREATE_COMMENTS_SUCCESS,
    FETCH_SINGLE_CREATE_COMMENTS_FAILURE
  } from '../Actions/createComment';
  
  const initialState = {
    doctor: {},
    commmentStatus: 'idle',
    commentError: null,
  };
  
  const createDoctorCommentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SINGLE_CREATE_COMMENTS_REQUEST:
        return {
          ...state,
          commmentStatus: 'loading',
        };
      case FETCH_SINGLE_CREATE_COMMENTS_SUCCESS:
        return {
          ...state,
          commmentStatus: 'succeeded',
          doctor: action.payload,
        };
      case FETCH_SINGLE_CREATE_COMMENTS_FAILURE:
        return {
          ...state,
          commmentStatus: 'failed',
          commentError: action,
        };
      default:
        return state;
    }
  };
  
  export default createDoctorCommentReducer;
  