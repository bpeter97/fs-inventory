import axios from 'axios';

// import types
import {
	GET_NOTIFICATIONS,
	NOTIFICATIONS_LOADING,
	MARK_NOTIFICATION_READ,
} from './../types/notificationTypes';

import { GET_ERRORS } from './../types/errorTypes';

export const getNotifications = () => (dispatch) => {
	dispatch(setNotificationsLoading());
	axios
		.get(`https://vhi-jm.herokuapp.com/api/notifications`)
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
			}),
		);
};

export const markNotificationsRead = () => (dispatch) => {
	dispatch(setNotificationsLoading());
	axios
		.patch(`https://vhi-jm.herokuapp.com/api/notifications/read/`)
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
			}),
		);
};

export const setNotificationsLoading = () => {
	return {
		type: NOTIFICATIONS_LOADING,
	};
};
