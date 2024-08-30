// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_DESTROY_DOC_IMAGE_DOCTOR_REQUEST = 'FETCH_DESTROY_DOC_IMAGE_DOCTOR_REQUEST';
export const FETCH_DESTROY_DOC_IMAGE_DOCTOR_SUCCESS= 'FETCH_DESTROY_DOC_IMAGE_DOCTOR__SUCCESS';
export const FETCH_DESTROY_DOC_IMAGE_DOCTOR_FAILURE = 'FETCH_DESTROY_DOC_IMAGE_DOCTOR_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_DESTROY_DOC_IMAGE_DOCTOR_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_DESTROY_DOC_IMAGE_DOCTOR_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_DESTROY_DOC_IMAGE_DOCTOR_FAILURE,
  payload: error
});

export const fetchDestroyImageDoctor = (img_id) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/destroy`, 
      {public_id:img_id},
      { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
