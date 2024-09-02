// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_UPDATE_PHARAMCYREQUEST = 'FETCH_UPDATE_PHARAMCYREQUEST';
export const FETCH_UPDATE_PHARAMCYSUCCESS = 'FETCH_UPDATE_PHARAMCY_SUCCESS';
export const FETCH_UPDATE_PHARAMCYFAILURE = 'FETCH_UPDATE_PHARAMCYFAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_UPDATE_PHARAMCYREQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_UPDATE_PHARAMCYSUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_UPDATE_PHARAMCYFAILURE,
  payload: error
});

export const fetchUpdatePharamcy = (id,data) => async (dispatch) => {
  const token=localStorage.getItem("token")
  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/pharmacies/${id}`,data, { headers: { BearerToken: token } },);
    dispatch(fetchSpecialtiesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};
