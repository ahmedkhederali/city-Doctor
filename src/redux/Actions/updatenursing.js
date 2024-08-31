// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_UPDATE_NURSING_REQUEST = 'FETCH_UPDATE_NURSING_REQUEST';
export const FETCH_UPDATE_NURSING_SUCCESS = 'FETCH_UPDATE_NURSING__SUCCESS';
export const FETCH_UPDATE_NURSING_FAILURE = 'FETCH_UPDATE_NURSING_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_UPDATE_NURSING_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_UPDATE_NURSING_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_UPDATE_NURSING_FAILURE,
  payload: error
});

export const fetchUpdateNursing = (id,data) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/nursing/${id}`,data, { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
