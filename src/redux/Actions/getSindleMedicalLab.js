// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_SINGLE_MEDICALLAB_REQUEST = 'FETCH_SINGLE_MEDICALLAB_REQUEST';
export const FETCH_SINGLE_MEDICALLAB_SUCCESS = 'FETCH_SINGLE_MEDICALLAB__SUCCESS';
export const FETCH_SINGLE_MEDICALLAB_FAILURE = 'FETCH_SINGLE_MEDICALLAB_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_SINGLE_MEDICALLAB_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_SINGLE_MEDICALLAB_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_SINGLE_MEDICALLAB_FAILURE,
  payload: error
});

export const fetchSingleMedicalLab = (id) => async (dispatch) => {
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/medicallabs/${id}`);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
  }
};
