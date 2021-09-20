import axios from 'axios';
import setAuthToken from './../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// import types
import { SET_CURRENT_USER } from './../types/authTypes';
import { GET_ERRORS } from './../types/errorTypes';

// import actions
import { clearErrors } from './../actions/errorActions';

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

export const registerUser = (userData, history) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post(`${process.env.API_URI}/register`, userData)
		.then((res) => history.push('/login'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			}),
		);
};

export const loginUser = (userData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post(`${process.env.API_URI}/login`, userData)
		.then((res) => {
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			var decoded = jwt_decode(token);
			// delete decoded._id;
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			}),
		);
};

export const logoutUser = () => (dispatch) => {
	dispatch(clearErrors());
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};
