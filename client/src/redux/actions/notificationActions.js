import axios from "axios";

// import types
import {
	GET_NOTIFICATIONS,
	NOTIFICATIONS_LOADING,
	MARK_NOTIFICATION_READ,
} from "./../types/notificationTypes";

import { GET_ERRORS } from "./../types/errorTypes";

var url;

if (process.env.NODE_ENV === "production") {
	url = "https://vhi-jm.herokuapp.com/api";
} else {
	url = "http://localhost:5000/api";
}

export const getNotifications = () => (dispatch) => {
	dispatch(setNotificationsLoading());
	axios
		.get(`${url}/notifications`)
		.then((res) => {
			dispatch({
				type: GET_NOTIFICATIONS,
				payload: res.data.sort(function (a, b) {
					var dateA = new Date(a.date),
						dateB = new Date(b.date);
					return dateB - dateA;
				}),
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const markNotificationsRead = () => (dispatch) => {
	dispatch(setNotificationsLoading());
	axios
		.patch(`${url}/notifications/read/`)
		.then((res) => {
			dispatch({
				type: MARK_NOTIFICATION_READ,
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

export const setNotificationsLoading = () => {
	return {
		type: NOTIFICATIONS_LOADING,
	};
};
