// reducers/authReducer.js

import {
  RATE_DOCTOR_REQUEST,
  RATE_DOCTOR_SUCCESS,
  RATE_DOCTOR_FAILURE,
} from '../Actions/ratingDoctors';

const initialState = {
  rating: null,
  status: 'idle',
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATE_DOCTOR_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case RATE_DOCTOR_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        user: action.payload,
      };
    case RATE_DOCTOR_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
