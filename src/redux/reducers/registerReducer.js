import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../Actions/registerAuthActions';

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        user: action.payload.user, // Assuming the response contains user data
        token: action.payload.token, // Assuming the response contains the token
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
