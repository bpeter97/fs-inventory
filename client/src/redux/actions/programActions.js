import axios from "axios";
import getApiUri from "../../middleware/getApiUri";

// import types
import {
	CREATE_PROGRAM,
	DELETE_PROGRAM,
	GET_PROGRAMS,
	PROGRAMS_LOADING,
	UPDATE_PROGRAM,
} from "./../types/programTypes";

import { GET_ERRORS } from "./../types/errorTypes";

const url = getApiUri();

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

export const postProgram = (data) => (dispatch) => {
	dispatch(setProgramsLoading());
	axios
		.post(`${url}/programs`, data)
		.then((res) => {
			dispatch({ type: CREATE_PROGRAM, payload: res.data });
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const updateProgram = (id, data) => (dispatch) => {
	dispatch(setProgramsLoading());
	axios
		.patch(`${url}/programs/${id}`, data)
		.then((res) => {
			dispatch({
				type: UPDATE_PROGRAM,
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

export const deleteProgram = (id) => (dispatch) => {
	dispatch(setProgramsLoading());
	axios
		.delete(`${url}/programs/${id}`)
		.then((res) => {
			dispatch({
				type: DELETE_PROGRAM,
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
