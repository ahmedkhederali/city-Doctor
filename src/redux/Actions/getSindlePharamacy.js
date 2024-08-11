// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_SINGLE_PHARAMACY_REQUEST = 'FETCH_SINGLE_PHARAMACY_REQUEST';
export const FETCH_SINGLE_PHARAMACY_SUCCESS = 'FETCH_SINGLE_PHARAMACY__SUCCESS';
export const FETCH_SINGLE_PHARAMACY_FAILURE = 'FETCH_SINGLE_PHARAMACY_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_SINGLE_PHARAMACY_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_SINGLE_PHARAMACY_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_SINGLE_PHARAMACY_FAILURE,
  payload: error
});

export const fetchSinglePharamacy = (id) => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pharmacies/${id}`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
  }
};
