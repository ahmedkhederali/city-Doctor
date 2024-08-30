// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_CREATE_DOCTOR_REQUEST = 'FETCH_CREATE_DOCTOR_REQUEST';
export const FETCH_CREATE_DOCTOR_SUCCESS = 'FETCH_CREATE_DOCTOR__SUCCESS';
export const FETCH_CREATE_DOCTOR_FAILURE = 'FETCH_CREATE_DOCTOR_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_CREATE_DOCTOR_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_CREATE_DOCTOR_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_CREATE_DOCTOR_FAILURE,
  payload: error
});

export const fetchCreateDoctor = (data) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/doctors`,data, { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
