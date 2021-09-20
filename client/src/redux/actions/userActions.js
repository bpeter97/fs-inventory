import axios from 'axios';

// import types
import {
	GET_USERS,
	USERS_LOADING,
	CREATE_USER,
	ACTIVATE_USER,
} from '../types/userTypes';

import { GET_ERRORS } from '../types/errorTypes';

import { clearErrors } from './../actions/errorActions';

export const getUsers = () => (dispatch) => {
	dispatch(setUsersLoading());
	axios
		.get(`${process.env.API_URI}/users`)
		.then((res) => {
			dispatch({
				type: GET_USERS,
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

export const createUser = (userData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post(`${process.env.API_URI}/users`, userData)
		.then((res) => {
			dispatch({
				type: CREATE_USER,
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

export const activateUser = (id) => (dispatch) => {
	dispatch(setUsersLoading());
	axios
		.post(`${process.env.API_URI}/users/activate`, id)
		.then((res) => {
			dispatch({
				type: ACTIVATE_USER,
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

export const setUsersLoading = () => {
	return {
		type: USERS_LOADING,
	};
};
