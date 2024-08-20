// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_ALL_NURSING_REQUEST = 'FETCH_ALL_NURSING_REQUEST';
export const FETCH_ALL_NURSING_SUCCESS = 'FETCH_ALL_NURSING__SUCCESS';
export const FETCH_ALL_NURSING_FAILURE = 'FETCH_ALL_NURSING_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_ALL_NURSING_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_ALL_NURSING_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_ALL_NURSING_FAILURE,
  payload: error
});

export const fetchAllNursing = (page) => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/nursing?page=${page}`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
