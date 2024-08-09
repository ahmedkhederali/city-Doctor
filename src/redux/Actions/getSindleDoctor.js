// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_SINGLE_DOCTOR_REQUEST = 'FETCH_SINGLE_DOCTOR_REQUEST';
export const FETCH_SINGLE_DOCTOR_SUCCESS = 'FETCH_SINGLE_DOCTOR__SUCCESS';
export const FETCH_SINGLE_DOCTOR_FAILURE = 'FETCH_SINGLE_DOCTOR_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_SINGLE_DOCTOR_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_SINGLE_DOCTOR_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_SINGLE_DOCTOR_FAILURE,
  payload: error
});

export const fetchSingleDoctor = (id) => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/doctors/${id}`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
  }
};
