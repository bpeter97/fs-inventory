import axios from "axios";

// import types
import {
	GET_SUBSECTIONS,
	SUBSECTION_LOADING,
} from "./../types/subSectionTypes";

import { GET_ERRORS } from "./../types/errorTypes";

var url;

if (process.env.NODE_ENV === "production") {
	url = "https://vhi-jm.herokuapp.com/api";
} else {
	url = "http://localhost:5000/api";
}

export const getSubSections = (id) => (dispatch) => {
	dispatch(setSubSectionLoading());
	axios
		.get(`${url}/subsections`)
		.then((res) => {
			dispatch({
				type: GET_SUBSECTIONS,
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

export const setSubSectionLoading = () => {
	return {
		type: SUBSECTION_LOADING,
	};
};
