// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_DEGREE_REQUEST = 'FETCH_DEGREE_REQUEST';
export const FETCH_DEGREE_SUCCESS = 'FETCH_DEGREE_SUCCESS';
export const FETCH_DEGREE_FAILURE = 'FETCH_DEGREE_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_DEGREE_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_DEGREE_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_DEGREE_FAILURE,
  payload: error
});

export const fetchDegrees = () => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/degrees`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error.message));
    throw error.response?.data
  }
};
