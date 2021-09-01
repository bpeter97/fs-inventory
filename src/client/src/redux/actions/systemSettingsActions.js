import axios from "axios";

// import types
import {
  GET_SYSTEM_SETTINGS,
  SYSTEM_SETTINGS_LOADING,
  UPDATE_SYSTEM_SETTINGS,
} from "../types/settingsTypes";

import { GET_ERRORS } from "../types/errorTypes";

export const getSystemSettings = () => (dispatch) => {
  dispatch(setSystemSettingsLoading());
  axios
    .get(`/api/systemsettings`)
    .then((res) => {
      dispatch({
        type: GET_SYSTEM_SETTINGS,
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

export const updateSystemSettings = (data) => (dispatch) => {
  dispatch(setSystemSettingsLoading());
  axios
    .patch(`/api/systemsettings/${data._id}`, data)
    .then((res) => {
      dispatch({
        type: UPDATE_SYSTEM_SETTINGS,
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

export const setSystemSettingsLoading = () => {
  return {
    type: SYSTEM_SETTINGS_LOADING,
  };
};
