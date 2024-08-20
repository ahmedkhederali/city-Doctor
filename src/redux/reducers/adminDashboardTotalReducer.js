import {
    FETCH_ADMIN_DASHBOARD_TOTAL_REQUEST,
    FETCH_ADMIN_DASHBOARD_TOTAL_SUCCESS,
    FETCH_ADMIN_DASHBOARD_TOTAL_FAILURE
  } from '../Actions/AdminDashboardTotal';
  
  const initialState = {
    data: {},
    status: 'idle',
    error: null,
  };
  
  const adminDashboardTotalReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ADMIN_DASHBOARD_TOTAL_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_ADMIN_DASHBOARD_TOTAL_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          data: action.payload,
        };
      case FETCH_ADMIN_DASHBOARD_TOTAL_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action,
        };
      case 'CLEAR_DOCTORS':
        return {
          ...state,
          items: {
            ...state.items,
            doctors: [],
          },
        };
      default:
        return state;
    }
  };
  
  export default adminDashboardTotalReducer;
  