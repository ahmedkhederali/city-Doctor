import {
    FETCH_ADMIN_DASHBOARD_TOTAL_MEDICAL_REQUEST,
    FETCH_ADMIN_DASHBOARD_TOTAL_MEDICAL_SUCCESS,
    FETCH_ADMIN_DASHBOARD_TOTAL_MEDICAL_FAILURE
  } from '../Actions/AdminDashboardTotalMedical.js';
  
  const initialState = {
    data: [],
    status: 'idle',
    error: null,
  };
  
  const adminDashboardTotalMedicalReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ADMIN_DASHBOARD_TOTAL_MEDICAL_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_ADMIN_DASHBOARD_TOTAL_MEDICAL_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          data: action.payload?.data,
        };
      case FETCH_ADMIN_DASHBOARD_TOTAL_MEDICAL_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default adminDashboardTotalMedicalReducer;
  