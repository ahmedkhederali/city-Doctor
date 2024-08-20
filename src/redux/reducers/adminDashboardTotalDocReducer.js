import {
    FETCH_ADMIN_DASHBOARD_TOTAL_DOC_REQUEST,
    FETCH_ADMIN_DASHBOARD_TOTAL_DOC_SUCCESS,
    FETCH_ADMIN_DASHBOARD_TOTAL_DOC_FAILURE
  } from '../Actions/AdminDashboardTotalDoc';
  
  const initialState = {
    data: [],
    status: 'idle',
    error: null,
  };
  
  const adminDashboardTotalDocReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ADMIN_DASHBOARD_TOTAL_DOC_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_ADMIN_DASHBOARD_TOTAL_DOC_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          data: action.payload?.data,
        };
      case FETCH_ADMIN_DASHBOARD_TOTAL_DOC_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      default:
        return state;
    }
  };
  
  export default adminDashboardTotalDocReducer;
  