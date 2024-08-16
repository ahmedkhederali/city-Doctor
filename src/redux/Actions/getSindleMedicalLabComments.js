// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_SINGLE_MEDICAL_LAB_COMMENTS_REQUEST = 'FETCH_SINGLE_MEDICAL_LAB_COMMENTS_REQUEST';
export const FETCH_SINGLE_MEDICAL_LAB_COMMENTS_SUCCESS = 'FETCH_SINGLE_MEDICAL_LAB_COMMENTS__SUCCESS';
export const FETCH_SINGLE_MEDICAL_LAB_COMMENTS_FAILURE = 'FETCH_SINGLE_MEDICAL_LAB_COMMENTS_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_SINGLE_MEDICAL_LAB_COMMENTS_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_SINGLE_MEDICAL_LAB_COMMENTS_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_SINGLE_MEDICAL_LAB_COMMENTS_FAILURE,
  payload: error
});

export const fetchSingleMedicalLabComments = (id) => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/comments/${id}/MedicalLab`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
  }
};
