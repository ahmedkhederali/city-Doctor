import {
  FETCH_CREATE_NURSING_REQUEST,
  FETCH_CREATE_NURSING_SUCCESS,
  FETCH_CREATE_NURSING_FAILURE
} from '../Actions/createNursing';

const initialState = {
  nursing: {},
  Status: 'idle',
  commentError: null,
};

const createNewNursingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREATE_NURSING_REQUEST:
      return {
        ...state,
        Status: 'loading',
      };
    case FETCH_CREATE_NURSING_SUCCESS:
      return {
        ...state,
        Status: 'succeeded',
        nursing: action.payload,
      };
    case FETCH_CREATE_NURSING_FAILURE:
      return {
        ...state,
        Status: 'failed',
        commentError: action.payload,  // تصحيح اسم المتغير إلى commentError
      };
    default:
      return state;
  }
};

export default createNewNursingReducer;
