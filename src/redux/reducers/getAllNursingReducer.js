import {
  FETCH_ALL_NURSING_REQUEST,
  FETCH_ALL_NURSING_SUCCESS,
  FETCH_ALL_NURSING_FAILURE
} from '../Actions/getAllNursing';

const initialState = {
  nurses: [],
  totalPages: 1,
  currentPage: 1,
  status: 'idle',
  error: null,
};

const getAllNursingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_NURSING_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case FETCH_ALL_NURSING_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        nurses: action.payload.nurses,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case FETCH_ALL_NURSING_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.error,
      };
    default:
      return state;
  }
};

export default getAllNursingReducer;
