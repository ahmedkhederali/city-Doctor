// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_REQUEST = 'FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_REQUEST';
export const FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_SUCCESS = 'FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_SUCCESS';
export const FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_FAILURE = 'FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_FAILURE';

export const fetchSpecialtiesRequest = () => ({
  type: FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_REQUEST
});

export const fetchSpecialtiesSuccess = (data) => ({
  type: FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_SUCCESS,
  payload: data
});

export const fetchSpecialtiesFailure = (error) => ({
  type: FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_FAILURE,
  payload: error
});

export const fetchAdminDashboardTotalNursing= () => async (dispatch) => {
  const token=localStorage.getItem("token")

  dispatch(fetchSpecialtiesRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/nursing_dashboard`,{ headers: { BearerToken: token } });
    dispatch(fetchSpecialtiesSuccess(response.data));
    return response.data
  } catch (error) {
    dispatch(fetchSpecialtiesFailure(error));
    throw error.response?.data
  }
};

