import axios from 'axios';

export const RATE_NURSING_REQUEST = 'RATE_NURSING_REQUEST';
export const RATE_NURSING_SUCCESS = 'RATE_NURSING_SUCCESS';
export const RATE_NURSING_FAILURE = 'RATE_NURSING_FAILURE';


export const rateDoctorRequest = () => ({
  type: RATE_NURSING_REQUEST,
});

export const rateDoctorSuccess = (data) => ({
  type: RATE_NURSING_SUCCESS,
  payload: data,
});

export const rateDoctorFailure = (error) => ({
  type: RATE_NURSING_FAILURE,
  payload: error,
});

export const rateNursing= (id, rating) => async (dispatch) => {
  try {
    const token=localStorage.getItem("token")
    dispatch(rateDoctorRequest());
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/nursing/rating/${id}`,
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