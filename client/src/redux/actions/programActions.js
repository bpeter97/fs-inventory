import axios from "axios";

// import types
import { GET_PROGRAMS, PROGRAMS_LOADING } from "./../types/programTypes";

import { GET_ERRORS } from "./../types/errorTypes";

var url;

if (process.env.NODE_ENV === "production") {
	url = "https://vhi-jm.herokuapp.com/api";
} else {
	url = "http://localhost:5000/api";
}

export const getPrograms = () => (dispatch) => {
	dispatch(setProgramsLoading());
	axios
		.get(`${url}/programs`)
		.then((res) => {
			dispatch({
				type: GET_PROGRAMS,
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

export const setProgramsLoading = () => {
	return {
		type: PROGRAMS_LOADING,
	};
};
