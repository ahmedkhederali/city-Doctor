// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const MEDICAL_LAB_REQUEST = 'MEDICAL_LAB_REQUEST';
export const MEDICAL_LAB_SUCCESS = 'MEDICAL_LAB_SUCCESS';
export const MEDICAL_LAB_FAILURE = 'MEDICAL_LAB_FAILURE';

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

export const fetchMedicalLabs = (medicalType = '') => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    // Pass medicalType as a query parameter
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/medicallabs`, {
      params: { type: medicalType }
    });
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error.message));
    throw error.response?.data
  }
};
