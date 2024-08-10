// src/redux/actions/specialtiesActions.js
import axios from 'axios';

export const FETCH_SINGLE_CREATE_COMMENTS_REQUEST = 'FETCH_SINGLE_CREATE_COMMENTS_REQUEST';
export const FETCH_SINGLE_CREATE_COMMENTS_SUCCESS = 'FETCH_SINGLE_CREATE_COMMENTS__SUCCESS';
export const FETCH_SINGLE_CREATE_COMMENTS_FAILURE = 'FETCH_SINGLE_CREATE_COMMENTS_FAILURE';
const token=localStorage.getItem("token")
export const fetchSingleCreateCommentsRequest = () => ({
  type: FETCH_SINGLE_CREATE_COMMENTS_REQUEST,
});

export const fetchSingleCreateCommentsSuccess = (data) => ({
  type: FETCH_SINGLE_CREATE_COMMENTS_SUCCESS,
  payload: data,
});

export const fetchSingleCreateCommentsFailure = (error) => ({
  type: FETCH_SINGLE_CREATE_COMMENTS_FAILURE,
  payload: error,
});

export const createComment = (refId, onModel = 'Doctor', comment) => async (dispatch) => {
  dispatch(fetchSingleCreateCommentsRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/comments`,
      { refId, onModel, comment },
      { headers: { BearerToken: token } }
    );
    dispatch(fetchSingleCreateCommentsSuccess(response.data));
  } catch (error) {
    dispatch(fetchSingleCreateCommentsFailure(error));
  }
};
