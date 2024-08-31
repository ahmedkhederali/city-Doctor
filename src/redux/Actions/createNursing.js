// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_CREATE_NURSING_REQUEST = 'FETCH_CREATE_NURSING_REQUEST';
export const FETCH_CREATE_NURSING_SUCCESS = 'FETCH_CREATE_NURSING__SUCCESS';
export const FETCH_CREATE_NURSING_FAILURE = 'FETCH_CREATE_NURSING_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_CREATE_NURSING_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_CREATE_NURSING_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_CREATE_NURSING_FAILURE,
  payload: error
});

export const fetchCreateNursing = (data) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/nursing`,data, { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
