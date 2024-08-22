// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_ALL_MEDICALLAB_REQUEST = 'FETCH_ALL_MEDICALLAB_REQUEST';
export const FETCH_ALL_MEDICALLAB_SUCCESS = 'FETCH_ALL_MEDICALLAB__SUCCESS';
export const FETCH_ALL_MEDICALLAB_FAILURE = 'FETCH_ALL_MEDICALLAB_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_ALL_MEDICALLAB_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_ALL_MEDICALLAB_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_ALL_MEDICALLAB_FAILURE,
  payload: error
});

export const fetchAllMedicalLac = (page) => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/medicallabs?page=${page}`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
