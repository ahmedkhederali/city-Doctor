import axios from 'axios';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (data) => ({
  type: SIGNUP_SUCCESS,
  payload: data,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const signupAuthAction = (userData) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, userData);
    dispatch(signupSuccess(response.data));
    return response.data; // Resolve the promise with the response data
  } catch (error) {
    dispatch(signupFailure(error.response.data));
    throw error.response?.data
  }
};
