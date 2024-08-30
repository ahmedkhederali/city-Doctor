// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_UPLOAD_DOC_IMAGE_DOCTOR_REQUEST = 'FETCH_UPLOAD_DOC_IMAGE_DOCTOR_REQUEST';
export const FETCH_UPLOAD_DOC_IMAGE_DOCTOR_SUCCESS = 'FETCH_UPLOAD_DOC_IMAGE_DOCTOR__SUCCESS';
export const FETCH_UPLOAD_DOC_IMAGE_DOCTOR_FAILURE = 'FETCH_UPLOAD_DOC_IMAGE_DOCTOR_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_UPLOAD_DOC_IMAGE_DOCTOR_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_UPLOAD_DOC_IMAGE_DOCTOR_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_UPLOAD_DOC_IMAGE_DOCTOR_FAILURE,
  payload: error
});

export const fetchUploadImageDoctor = (formData) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload`, 
      formData,
      { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};

