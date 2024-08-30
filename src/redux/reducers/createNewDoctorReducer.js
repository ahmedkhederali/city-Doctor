import {
  FETCH_CREATE_DOCTOR_REQUEST,
  FETCH_CREATE_DOCTOR_SUCCESS,
  FETCH_CREATE_DOCTOR_FAILURE
} from '../Actions/createDoctor';

const initialState = {
  doctor: {},
  Status: 'idle',
  commentError: null,
};

const createNewDoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREATE_DOCTOR_REQUEST:
      return {
        ...state,
        Status: 'loading',
      };
    case FETCH_CREATE_DOCTOR_SUCCESS:
      return {
        ...state,
        Status: 'succeeded',
        doctor: action.payload,
      };
    case FETCH_CREATE_DOCTOR_FAILURE:
      return {
        ...state,
        Status: 'failed',
        commentError: action.payload,  // تصحيح اسم المتغير إلى commentError
      };
    default:
      return state;
  }
};

export default createNewDoctorReducer;
