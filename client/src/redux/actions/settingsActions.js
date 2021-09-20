import axios from "axios";

// import types
import {
	GET_SETTINGS,
	SETTINGS_LOADING,
	UPDATE_SETTINGS,
} from "./../types/settingsTypes";

import { GET_ERRORS } from "./../types/errorTypes";

var url;

if (process.env.NODE_ENV === "production") {
	url = "https://vhi-jm.herokuapp.com/api";
} else {
	url = "http://localhost:5000/api";
}

export const getSettings = (id) => (dispatch) => {
	dispatch(setSettingsLoading());
	axios
		.get(`${url}/settings/${id}`)
		.then((res) => {
			dispatch({
				type: GET_SETTINGS,
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

export const updateSettings = (data) => (dispatch) => {
	dispatch(setSettingsLoading());
	axios
		.patch(`${url}/settings/${data._id}`, data)
		.then((res) => {
			dispatch({
				type: UPDATE_SETTINGS,
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

export const setSettingsLoading = () => {
	return {
		type: SETTINGS_LOADING,
	};
};
