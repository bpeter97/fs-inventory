import axios from "axios";
import getApiUri from "../../middleware/getApiUri";

// import types
import {
	CREATE_ITEM,
	DELETE_ITEM,
	GET_ITEM,
	GET_ITEMS,
	ITEMS_LOADING,
	UPDATE_ITEM,
} from "./../types/itemTypes";

import { GET_ERRORS } from "./../types/errorTypes";

const url = getApiUri();

export const getItems = () => (dispatch) => {
	dispatch(setItemsLoading());
	axios
		.get(`${url}/items`)
		.then((res) => {
			dispatch({
				type: GET_ITEMS,
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

export const getItem = (id) => (dispatch) => {
	dispatch(setItemsLoading());
	axios
		.get(`${url}/items/${id}`)
		.then((res) => {
			dispatch({
				type: GET_ITEM,
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

export const postItem = (data) => (dispatch) => {
	dispatch(setItemsLoading());
	axios
		.post(`${url}/items`, data)
		.then((res) => {
			dispatch({ type: CREATE_ITEM, payload: res.data });
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const updateItem = (id, data) => (dispatch) => {
	dispatch(setItemsLoading());
	axios
		.patch(`${url}/items/${id}`, data)
		.then((res) => {
			dispatch({
				type: UPDATE_ITEM,
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

export const deleteItem = (id) => (dispatch) => {
	dispatch(setItemsLoading());
	axios
		.delete(`${url}/items/${id}`)
		.then((res) => {
			dispatch({
				type: DELETE_ITEM,
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

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING,
	};
};
