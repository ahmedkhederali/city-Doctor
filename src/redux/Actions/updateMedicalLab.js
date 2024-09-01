// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_UPDATE_MEDICALLAB_REQUEST = 'FETCH_UPDATE_MEDICALLAB_REQUEST';
export const FETCH_UPDATE_MEDICALLAB_SUCCESS = 'FETCH_UPDATE_MEDICALLAB__SUCCESS';
export const FETCH_UPDATE_MEDICALLAB_FAILURE = 'FETCH_UPDATE_MEDICALLAB_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_UPDATE_MEDICALLAB_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_UPDATE_MEDICALLAB_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_UPDATE_MEDICALLAB_FAILURE,
  payload: error
});

export const fetchUpdateMedicalLab = (id,data) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/medicallabs/${id}`,data, { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
