import axios from 'axios';

// import types
import { GET_CLIENTS, CLIENTS_LOADING } from './../types/clientTypes';

import { GET_ERRORS } from './../types/errorTypes';

var url;

if (process.env.NODE_ENV === 'production') {
	url = 'https://vhi-jm.herokuapp.com/api';
} else {
	url = 'http://localhost:5000/api';
}

export const getClients = (id) => (dispatch) => {
	dispatch(setClientsLoading());
	axios
		.get(`${url}/clients`)
		.then((res) => {
			dispatch({
				type: GET_CLIENTS,
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

export const setClientsLoading = () => {
	return {
		type: CLIENTS_LOADING,
	};
};
