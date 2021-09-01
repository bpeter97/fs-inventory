import axios from "axios";

// import types
import {
  GET_CALLS,
  CREATE_CALL,
  CALLS_LOADING,
  DELETE_CALL
} from "../types/callTypes";

import { GET_ERRORS } from "../types/errorTypes";
import { SET_SUCCESS } from "../types/successTypes";

export const getCalls = (id) => (dispatch) => {
  dispatch(setCallsLoading());
  axios
    .get(`/api/calls`)
    .then((res) => {
      let calls = res.data.map((element) => {
        return {
          ...element,
          full_address: element.address + ', ' + element.state + ', ' + element.zipcode
        }
      });
      dispatch({
        type: GET_CALLS,
        payload: calls,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const createCall = (data) => (dispatch) => {
  dispatch(setCallsLoading());
  axios
    .post("/api/calls", data)
    .then((res) => {
      dispatch({
        type: CREATE_CALL,
        payload: res.data,
      })
      dispatch({
        type: SET_SUCCESS,
        payload: "Successfully created the call."
      })
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}

export const deleteCall = (id) => (dispatch) => {
  dispatch(setCallsLoading());
  axios
    .delete(`/api/calls/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_CALL,
        payload: res.data,
      })
      dispatch({
        type: SET_SUCCESS,
        payload: "Successfully deleted the call."
      })
    })
    .catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  );
}

export const setCallsLoading = () => {
  return {
    type: CALLS_LOADING,
  };
};
