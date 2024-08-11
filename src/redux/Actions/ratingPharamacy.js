import axios from 'axios';

export const RATE_PHARAMACY_REQUEST = 'RATE_PHARAMACY_REQUEST';
export const RATE_PHARAMACY_SUCCESS = 'RATE_PHARAMACY_SUCCESS';
export const RATE_PHARAMACY_FAILURE = 'RATE_PHARAMACY_FAILURE';

const token=localStorage.getItem("token")

export const rateDoctorRequest = () => ({
  type: RATE_PHARAMACY_REQUEST,
});

export const rateDoctorSuccess = (data) => ({
  type: RATE_PHARAMACY_SUCCESS,
  payload: data,
});

export const rateDoctorFailure = (error) => ({
  type: RATE_PHARAMACY_FAILURE,
  payload: error,
});

export const ratePharamacy= (id, rating) => async (dispatch) => {
  try {
    dispatch(rateDoctorRequest());
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/pharmacies/rating/${id}`,
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