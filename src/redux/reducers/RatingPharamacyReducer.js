// reducers/authReducer.js

import {
  RATE_PHARAMACY_REQUEST,
  RATE_PHARAMACY_SUCCESS,
  RATE_PHARAMACY_FAILURE,
} from '../Actions/ratingPharamacy';

const initialState = {
  rating: null,
  status: 'idle',
  error: null,
};

const medicalLabReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATE_PHARAMACY_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case RATE_PHARAMACY_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        user: action.payload,
      };
    case RATE_PHARAMACY_FAILURE:
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
