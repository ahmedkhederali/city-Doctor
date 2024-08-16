// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const PHARAMACY_REQUEST = 'PHARAMACY_REQUEST';
export const PHARAMACY_SUCCESS = 'PHARAMACY_SUCCESS';
export const PHARAMACY_FAILURE = 'PHARAMACY_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: PHARAMACY_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: PHARAMACY_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: PHARAMACY_FAILURE,
  payload: error
});

export const fetchPharamacy = () => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pharmacies`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error.message));
    throw error.response?.data
  }
};
