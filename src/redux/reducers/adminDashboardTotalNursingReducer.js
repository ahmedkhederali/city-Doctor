import {
    FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_REQUEST,
    FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_SUCCESS,
    FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_FAILURE
  } from '../Actions/AdminDashboardTotalNursing';
  
  const initialState = {
    data: [],
    status: 'idle',
    error: null,
  };
  
  const adminDashboardTotalNursingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          data: action.payload?.data,
        };
      case FETCH_ADMIN_DASHBOARD_TOTAL_NURSING_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default adminDashboardTotalNursingReducer;
  