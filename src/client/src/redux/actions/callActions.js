import axios from "axios";

// import types
import {
  GET_CALLS,
  CALLS_LOADING
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
      dispatch({
        type: SET_SUCCESS,
        payload: "Successfully retrieved the call list."
      })
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCallsLoading = () => {
  return {
    type: CALLS_LOADING,
  };
};
