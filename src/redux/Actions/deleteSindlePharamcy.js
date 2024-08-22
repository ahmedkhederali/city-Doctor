// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_DELETE_SINGLE_PHARAMCY_REQUEST = 'FETCH_DELETE_SINGLE_PHARAMCY_REQUEST';
export const FETCH_DELETE_SINGLE_PHARAMCY_SUCCESS = 'FETCH_DELETE_SINGLE_PHARAMCY__SUCCESS';
export const FETCH_DELETE_SINGLE_PHARAMCY_FAILURE = 'FETCH_DELETE_SINGLE_PHARAMCY_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_DELETE_SINGLE_PHARAMCY_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_DELETE_SINGLE_PHARAMCY_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_DELETE_SINGLE_PHARAMCY_FAILURE,
  payload: error
});

export const fetchDeleSinglePharamcy = (id) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/pharmacies/${id}`, { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
