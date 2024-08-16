// reducers/authReducer.js

import {
  RATE_NURSING_REQUEST,
  RATE_NURSING_SUCCESS,
  RATE_NURSING_FAILURE,
} from '../Actions/ratingNursing';

const initialState = {
  rating: null,
  status: 'idle',
  error: null,
};

const nursingRateReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATE_NURSING_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case RATE_NURSING_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        user: action.payload,
      };
    case RATE_NURSING_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default nursingRateReducer;
