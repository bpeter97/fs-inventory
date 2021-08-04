import axios from "axios";

// import types
import {
  GET_INSPECTIONS,
  INSPECTION_LOADING
} from "./../types/inspectionTypes";

import { GET_ERRORS } from "./../types/errorTypes";

export const getInspections = (id) => (dispatch) => {
  dispatch(setInspectionsLoading());
  axios
    .get(`/api/inspections`)
    .then((res) => {
      dispatch({
        type: GET_INSPECTIONS,
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

export const setInspectionsLoading = () => {
  return {
    type: INSPECTION_LOADING,
  };
};
