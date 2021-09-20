import axios from "axios";

// import types
import {
	GET_INSPECTIONS,
	INSPECTION_LOADING,
} from "./../types/inspectionTypes";

import { GET_ERRORS } from "./../types/errorTypes";

var url;

if (process.env.NODE_ENV === "production") {
	url = "https://vhi-jm.herokuapp.com/api";
} else {
	url = "http://localhost:5000/api";
}

export const getInspections = (id) => (dispatch) => {
	dispatch(setInspectionsLoading());
	axios
		.get(`${url}/inspections`)
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
