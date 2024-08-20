// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_DELETE_SINGLE_DOCTO_REQUEST = 'FETCH_DELETE_SINGLE_DOCTO_REQUEST';
export const FETCH_DELETE_SINGLE_DOCTO_SUCCESS = 'FETCH_DELETE_SINGLE_DOCTO__SUCCESS';
export const FETCH_DELETE_SINGLE_DOCTO_FAILURE = 'FETCH_DELETE_SINGLE_DOCTO_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_DELETE_SINGLE_DOCTO_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_DELETE_SINGLE_DOCTO_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_DELETE_SINGLE_DOCTO_FAILURE,
  payload: error
});

export const fetchDeleSingleDoctor = (id) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/doctors/${id}`, { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
