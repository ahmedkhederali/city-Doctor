// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_DELETE_SINGLE_MEDICALLABS_REQUEST = 'FETCH_DELETE_SINGLE_MEDICALLABS_REQUEST';
export const FETCH_DELETE_SINGLE_MEDICALLABS_SUCCESS = 'FETCH_DELETE_SINGLE_MEDICALLABS__SUCCESS';
export const FETCH_DELETE_SINGLE_MEDICALLABS_FAILURE = 'FETCH_DELETE_SINGLE_MEDICALLABS_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_DELETE_SINGLE_MEDICALLABS_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_DELETE_SINGLE_MEDICALLABS_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_DELETE_SINGLE_MEDICALLABS_FAILURE,
  payload: error
});

export const fetchDeleSingleMedicalLabs = (id) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/medicallabs/${id}`, { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
