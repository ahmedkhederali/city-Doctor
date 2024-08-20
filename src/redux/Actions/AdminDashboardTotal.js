// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_ADMIN_DASHBOARD_TOTAL_REQUEST = 'FETCH_ADMIN_DASHBOARD_TOTAL_REQUEST';
export const FETCH_ADMIN_DASHBOARD_TOTAL_SUCCESS = 'FETCH_ADMIN_DASHBOARD_TOTAL_SUCCESS';
export const FETCH_ADMIN_DASHBOARD_TOTAL_FAILURE = 'FETCH_ADMIN_DASHBOARD_TOTAL_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_ADMIN_DASHBOARD_TOTAL_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_ADMIN_DASHBOARD_TOTAL_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_ADMIN_DASHBOARD_TOTAL_FAILURE,
  payload: error
});

export const fetchAdminDashboardTotal = () => async (dispatch) => {
  const token=localStorage.getItem("token")

  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/dashboard`,{ headers: { BearerToken: token } });
    dispatch(fetchSpecialtiesSuccess(response.data));
    return response.data
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};

