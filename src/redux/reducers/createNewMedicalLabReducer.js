import {
  FETCH_CREATE_MEDICALLAB_REQUEST,
  FETCH_CREATE_MEDICALLAB_SUCCESS,
  FETCH_CREATE_MEDICALLAB_FAILURE
} from '../Actions/createMedicalLab';

const initialState = {
  medicalLabNew: {},
  Status: 'idle',
  commentError: null,
};

const createNewMedicalLabReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREATE_MEDICALLAB_REQUEST:
      return {
        ...state,
        Status: 'loading',
      };
    case FETCH_CREATE_MEDICALLAB_SUCCESS:
      return {
        ...state,
        Status: 'succeeded',
        medicalLabNew: action.payload,
      };
    case FETCH_CREATE_MEDICALLAB_FAILURE:
      return {
        ...state,
        Status: 'failed',
        commentError: action.payload,  // تصحيح اسم المتغير إلى commentError
      };
    default:
      return state;
  }
};

export default createNewMedicalLabReducer;
