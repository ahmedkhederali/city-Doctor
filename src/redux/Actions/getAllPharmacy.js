// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_ALL_PHARAMCY_REQUEST = 'FETCH_ALL_PHARAMCY_REQUEST';
export const FETCH_ALL_PHARAMCY_SUCCESS = 'FETCH_ALL_PHARAMCY__SUCCESS';
export const FETCH_ALL_PHARAMCY_FAILURE = 'FETCH_ALL_PHARAMCY_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_ALL_PHARAMCY_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_ALL_PHARAMCY_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_ALL_PHARAMCY_FAILURE,
  payload: error
});

export const fetchAllPharamcy = (page) => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pharmacies?page=${page}`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
