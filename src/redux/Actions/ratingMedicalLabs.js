import axios from 'axios';

export const RATE_MEDICALLABS_REQUEST = 'RATE_MEDICALLABS_REQUEST';
export const RATE_MEDICALLABS_SUCCESS = 'RATE_MEDICALLABS_SUCCESS';
export const RATE_MEDICALLABS_FAILURE = 'RATE_MEDICALLABS_FAILURE';


export const rateDoctorRequest = () => ({
  type: RATE_MEDICALLABS_REQUEST,
});

export const rateDoctorSuccess = (data) => ({
  type: RATE_MEDICALLABS_SUCCESS,
  payload: data,
});

export const rateDoctorFailure = (error) => ({
  type: RATE_MEDICALLABS_FAILURE,
  payload: error,
});

export const rateMedicalLabs = (id, rating) => async (dispatch) => {
  try {
const token=localStorage.getItem("token")

    dispatch(rateDoctorRequest());
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/medicallabs/rating/${id}`,
      { rating },
      { headers: { BearerToken: token } },
     );
    dispatch(rateDoctorSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(rateDoctorFailure(error));
    throw error.response?.data
  }
};