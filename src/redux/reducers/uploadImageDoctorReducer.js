import {
  FETCH_UPLOAD_DOC_IMAGE_DOCTOR_REQUEST,
  FETCH_UPLOAD_DOC_IMAGE_DOCTOR_SUCCESS,
  FETCH_UPLOAD_DOC_IMAGE_DOCTOR_FAILURE
} from '../Actions/uploadDoctorImage';

import {
  FETCH_DESTROY_DOC_IMAGE_DOCTOR_REQUEST,
  FETCH_DESTROY_DOC_IMAGE_DOCTOR_SUCCESS,
  FETCH_DESTROY_DOC_IMAGE_DOCTOR_FAILURE
} from '../Actions/destroyDoctorImage';

const initialState = {
  doctor_img: {},
  status: 'idle',
  error_img: null,
};

const uploadImageDoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UPLOAD_DOC_IMAGE_DOCTOR_REQUEST:
    case FETCH_DESTROY_DOC_IMAGE_DOCTOR_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case FETCH_UPLOAD_DOC_IMAGE_DOCTOR_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        doctor_img: action.payload,
      };
      case FETCH_DESTROY_DOC_IMAGE_DOCTOR_SUCCESS:
      return {
        status: 'succeeded',
        doctor_img: {},
      };
    case FETCH_UPLOAD_DOC_IMAGE_DOCTOR_FAILURE:
    case FETCH_DESTROY_DOC_IMAGE_DOCTOR_FAILURE:
      return {
        ...state,
        status: 'failed',
        error_img: action.payload,
      };
    default:
      return state;
  }
};

export default uploadImageDoctorReducer;
