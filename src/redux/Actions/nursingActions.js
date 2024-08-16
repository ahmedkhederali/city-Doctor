// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const NURSING_REQUEST = 'NURSING_REQUEST';
export const NURSING_SUCCESS = 'NURSING_SUCCESS';
export const NURSING_FAILURE = 'NURSING_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: NURSING_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: NURSING_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: NURSING_FAILURE,
  payload: error
});

export const fetchNursings = (medicalType = '') => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    // Pass medicalType as a query parameter
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/nursing`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error.message));
  }
};
