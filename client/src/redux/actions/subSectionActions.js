import axios from 'axios';

// import types
import {
	GET_SUBSECTIONS,
	SUBSECTION_LOADING,
} from './../types/subSectionTypes';

import { GET_ERRORS } from './../types/errorTypes';

export const getSubSections = (id) => (dispatch) => {
	dispatch(setSubSectionLoading());
	axios
		.get(`${process.env.API_URI}/subsections`)
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
			}),
		);
};

export const setSubSectionLoading = () => {
	return {
		type: SUBSECTION_LOADING,
	};
};
