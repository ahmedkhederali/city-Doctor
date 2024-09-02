import {
  FETCH_CREATE_PHARAMCY_REQUEST,
  FETCH_CREATE_PHARAMCY_SUCCESS,
  FETCH_CREATE_PHARAMCY_FAILURE
} from '../Actions/createPharamcy';

const initialState = {
  pharamcyNew: {},
  Status: 'idle',
  commentError: null,
};

const createNewPharamcybReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREATE_PHARAMCY_REQUEST:
      return {
        ...state,
        Status: 'loading',
      };
    case FETCH_CREATE_PHARAMCY_SUCCESS:
      return {
        ...state,
        Status: 'succeeded',
        pharamcyNew: action.payload,
      };
    case FETCH_CREATE_PHARAMCY_FAILURE:
      return {
        ...state,
        Status: 'failed',
        commentError: action.payload,  // تصحيح اسم المتغير إلى commentError
      };
    default:
      return state;
  }
};

export default createNewPharamcybReducer;
