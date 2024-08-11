// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const MEDICAL_LAB_REQUEST = 'MEDICAL_LAB_REQUEST';
export const MEDICAL_LAB_SUCCESS = 'MEDICAL_LAB_SUCCESS';
export const MEDICAL_LAB_FAILURE = 'MEDICAL_LAB_FAILURE';
const token=localStorage.getItem("token")

export const fetchSpecialtiesRequest = () => ({
  type: MEDICAL_LAB_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: MEDICAL_LAB_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: MEDICAL_LAB_FAILURE,
  payload: error
});

export const fetchMedicalLabs = () => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/medicallabs`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error.message));
  }
};
