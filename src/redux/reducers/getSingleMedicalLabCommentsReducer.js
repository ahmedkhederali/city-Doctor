import {
    FETCH_SINGLE_MEDICAL_LAB_COMMENTS_REQUEST,
    FETCH_SINGLE_MEDICAL_LAB_COMMENTS_SUCCESS,
    FETCH_SINGLE_MEDICAL_LAB_COMMENTS_FAILURE
  } from '../Actions/getSindleMedicalLabComments';
  
  const initialState = {
    comments: {},
  commmentStatus: 'idle',
    commentError: null,
  };
  
  const singleMedicalLabCommentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SINGLE_MEDICAL_LAB_COMMENTS_REQUEST:
        return {
          ...state,
          commmentStatus: 'loading',
        };
      case FETCH_SINGLE_MEDICAL_LAB_COMMENTS_SUCCESS:
        return {
          ...state,
          commmentStatus: 'succeeded',
          comments: action.payload,
        };
      case FETCH_SINGLE_MEDICAL_LAB_COMMENTS_FAILURE:
        return {
          ...state,
          commmentStatus: 'failed',
          commentError: action,
        };
      default:
        return state;
    }
  };
  
  export default singleMedicalLabCommentsReducer;
  