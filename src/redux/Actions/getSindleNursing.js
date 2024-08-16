// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_SINGLE_NURSING_REQUEST = 'FETCH_SINGLE_NURSING_REQUEST';
export const FETCH_SINGLE_NURSING_SUCCESS = 'FETCH_SINGLE_NURSING__SUCCESS';
export const FETCH_SINGLE_NURSING_FAILURE = 'FETCH_SINGLE_NURSING_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_SINGLE_NURSING_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_SINGLE_NURSING_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_SINGLE_NURSING_FAILURE,
  payload: error
});

export const fetchSingleNursing = (id) => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/nursing/${id}`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
  }
};
