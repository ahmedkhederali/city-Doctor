import axios from 'axios';

export const RATE_DOCTOR_REQUEST = 'RATE_DOCTOR_REQUEST';
export const RATE_DOCTOR_SUCCESS = 'RATE_DOCTOR_SUCCESS';
export const RATE_DOCTOR_FAILURE = 'RATE_DOCTOR_FAILURE';

const token=localStorage.getItem("token")

export const rateDoctorRequest = () => ({
  type: RATE_DOCTOR_REQUEST,
});

export const rateDoctorSuccess = (data) => ({
  type: RATE_DOCTOR_SUCCESS,
  payload: data,
});

export const rateDoctorFailure = (error) => ({
  type: RATE_DOCTOR_FAILURE,
  payload: error,
});

export const rateDoctor = (id, rating) => async (dispatch) => {
  try {
    dispatch(rateDoctorRequest());
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/doctors/rating/${id}`,
      { rating },
      { headers: { BearerToken: token } },
     );
    dispatch(rateDoctorSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(rateDoctorFailure(error));
    throw error;
  }
};