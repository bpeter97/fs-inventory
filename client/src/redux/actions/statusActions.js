import axios from "axios";

// import types
import {
  GET_STATUSES,
  CREATE_STATUS,
  STATUS_LOADING
} from "../types/statusTypes";

import { GET_ERRORS } from "../types/errorTypes";

export const getStatuses = (id) => (dispatch) => {
  dispatch(setStatusLoading());
  axios
    .get(`/api/status`)
    .then((res) => {
      dispatch({
        type: GET_STATUSES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const createStatus = (data) => (dispatch) => {
  dispatch(setStatusLoading());
  axios
    .post(`/api/status`, data)
    .then((res) => {
      dispatch({
        type: CREATE_STATUS,
        payload: res.data,
      });
    })    
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}

export const setStatusLoading = () => {
  return {
    type: STATUS_LOADING,
  };
};
