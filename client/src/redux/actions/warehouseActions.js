import axios from "axios";
import getApiUri from "../../middleware/getApiUri";

// import types
import {
	CREATE_WAREHOUSE,
	DELETE_WAREHOUSE,
	GET_WAREHOUSES,
	WAREHOUSES_LOADING,
	UPDATE_WAREHOUSE,
} from "./../types/warehouseTypes";

import { GET_ERRORS } from "./../types/errorTypes";

const url = getApiUri();

export const getWarehouses = () => (dispatch) => {
	dispatch(setWarehousesLoading());
	axios
		.get(`${url}/warehouses`)
		.then((res) => {
			dispatch({
				type: GET_WAREHOUSES,
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

export const postWarehouse = (data) => (dispatch) => {
	dispatch(setWarehousesLoading());
	axios
		.post(`${url}/warehouses`, data)
		.then((res) => {
			dispatch({ type: CREATE_WAREHOUSE, payload: res.data });
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const updateWarehouse = (id, data) => (dispatch) => {
	dispatch(setWarehousesLoading());
	axios
		.patch(`${url}/warehouses/${id}`, data)
		.then((res) => {
			dispatch({
				type: UPDATE_WAREHOUSE,
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

export const deleteWarehouse = (id) => (dispatch) => {
	dispatch(setWarehousesLoading());
	axios
		.delete(`${url}/warehouses/${id}`)
		.then((res) => {
			dispatch({
				type: DELETE_WAREHOUSE,
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

export const setWarehousesLoading = () => {
	return {
		type: WAREHOUSES_LOADING,
	};
};
