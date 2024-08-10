import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginAuthActions = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, { email, password });
    dispatch(loginSuccess(response.data));
    return response.data; // Resolve the promise with the response data
  } catch (error) {
    dispatch(loginFailure(error));
    throw error; // Reject the promise with the error
  }
};
