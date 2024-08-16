// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_SPECIALTIES_REQUEST = 'FETCH_SPECIALTIES_REQUEST';
export const FETCH_SPECIALTIES_SUCCESS = 'FETCH_SPECIALTIES_SUCCESS';
export const FETCH_SPECIALTIES_FAILURE = 'FETCH_SPECIALTIES_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_SPECIALTIES_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_SPECIALTIES_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_SPECIALTIES_FAILURE,
  payload: error
});

export const fetchSpecialties = () => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/specialties`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error.message));
    throw error.response?.data
  }
};
