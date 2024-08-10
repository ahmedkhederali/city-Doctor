import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../Actions/loginAuthActions';

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        user: action.payload.user, // Assuming the response contains user data
        token: action.payload.token, // Assuming the response contains the token
      };
    case LOGIN_FAILURE:
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
