// reducers/authReducer.js

import {
  RATE_MEDICALLABS_REQUEST,
  RATE_MEDICALLABS_SUCCESS,
  RATE_MEDICALLABS_FAILURE,
} from '../Actions/ratingMedicalLabs';

const initialState = {
  rating: null,
  status: 'idle',
  error: null,
};

const medicalLabReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATE_MEDICALLABS_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case RATE_MEDICALLABS_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        user: action.payload,
      };
    case RATE_MEDICALLABS_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default medicalLabReducer;
