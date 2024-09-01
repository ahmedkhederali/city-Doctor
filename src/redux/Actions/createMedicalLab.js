// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_CREATE_MEDICALLAB_REQUEST = 'FETCH_CREATE_MEDICALLAB_REQUEST';
export const FETCH_CREATE_MEDICALLAB_SUCCESS = 'FETCH_CREATE_MEDICALLAB__SUCCESS';
export const FETCH_CREATE_MEDICALLAB_FAILURE = 'FETCH_CREATE_MEDICALLAB_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_CREATE_MEDICALLAB_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_CREATE_MEDICALLAB_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_CREATE_MEDICALLAB_FAILURE,
  payload: error
});

export const fetchCreateMedical = (data) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/medicallabs`,data, { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
