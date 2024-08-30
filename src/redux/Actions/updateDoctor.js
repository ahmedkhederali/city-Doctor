// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_UPDATE_DOCTOR_REQUEST = 'FETCH_UPDATE_DOCTOR_REQUEST';
export const FETCH_UPDATE_DOCTOR_SUCCESS = 'FETCH_UPDATE_DOCTOR__SUCCESS';
export const FETCH_UPDATE_DOCTOR_FAILURE = 'FETCH_UPDATE_DOCTOR_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_UPDATE_DOCTOR_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_UPDATE_DOCTOR_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_UPDATE_DOCTOR_FAILURE,
  payload: error
});

export const fetchUpdateDoctor = (id,data) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/doctors/${id}`,data, { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
