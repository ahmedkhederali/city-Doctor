// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_DOCTOR_SPECIALTIES_REQUEST = 'FETCH_DOCTOR_SPECIALTIES_REQUEST';
export const FETCH_DOCTOR_SPECIALTIES_SUCCESS = 'FETCH_DOCTOR_SPECIALTIES_SUCCESS';
export const FETCH_DOCTOR_SPECIALTIES_FAILURE = 'FETCH_DOCTOR_SPECIALTIES_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_DOCTOR_SPECIALTIES_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_DOCTOR_SPECIALTIES_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_DOCTOR_SPECIALTIES_FAILURE,
  payload: error
});

export const fetchSpecialties = (id,page) => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/doctors/specialty/${id}?page=${page}`);
    dispatch(fetchSpecialtiesSuccess(response.data));
    return response.data
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
// actions/doctoBasedonSpecialist.js
export const clearDoctors = () => ({
  type: 'CLEAR_DOCTORS',
});
